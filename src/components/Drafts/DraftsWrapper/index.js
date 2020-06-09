import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@material-ui/core/';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { getLeadsLaunched } from '../../../pages/HomePage/reducer';

import DarkWrapper from '../../Layout/DarkWrapper/';
import FirstDraft from '../Draft/FirstDraft';
import Draft from '../Draft';
import DraftsPagination from '../DraftsPagination/';
import CustomLoader from '../../Loader';

const Drafts = ({ ...props }) => {
  const classes = styles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [currentDrafts, setCurrentDrafts] = useState();

  const { leadsData, leadsLoading } = useSelector(state => ({
    leadsData: state.getIn(['dashboard', 'leadsData']),
    leadsLoading: state.getIn(['dashboard', 'leadsLoading']),
  }));

  useEffect(() => {
    // dispatch(getLeadsLaunched());
  }, [dispatch]);

  useEffect(() => {
    setCurrentDrafts(leadsData);
    setCurrentDrafts([]);
  }, [leadsData]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 3,
      partialVisibilityGutter: 25,
    },
    tablet: {
      breakpoint: { max: 1400, min: 1000 },
      items: 2,
      partialVisibilityGutter: 15
    },
    mobile: {
      breakpoint: { max: 1000, min: 0 },
      items: 1,
      partialVisibilityGutter: 5
    }
  };

  let draftsList = (
    <DarkWrapper isBleed>
      {!leadsLoading ? (
        <FirstDraft />
      ) : (
          <Box mx='auto'>
            <CustomLoader size={70} />
          </Box>
        )
      }
    </DarkWrapper>
  );

  if (currentDrafts?.length > 0 && !leadsLoading) {
    draftsList = (
      <Carousel
        responsive={responsive}
        className={classes.draftsWrapper}
        arrows={false}
        customButtonGroup={<DraftsPagination />}
        renderButtonGroupOutside
        partialVisible
        infinite={false}
        {...props}
      >
        {currentDrafts?.map((draft, key) => <Draft key={key} draft={draft} />)}
      </Carousel>
    )
  };

  const draftsNumber = currentDrafts?.length > 0 ? ('0' + currentDrafts?.length).slice(-2) : null

  return (
    <Box my={4}>
      <Typography variant='h2'>{draftsNumber} {t('draft.briefsTitle')}</Typography>
      <br />
      {draftsList}
    </Box>
  );
};

export default Drafts;
