import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@material-ui/core/';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { getLeadsLaunched } from '../../../pages/HomePage/reducer';
// import { leads } from '../../../mock/leads';

import DarkWrapper from '../../Layout/DarkWrapper/';
import FirstDraft from '../Draft/FirstDraft';
import Draft from '../Draft';
import DraftsPagination from '../DraftsPagination/';
import CustomLoader from '../../Loader';

const Drafts = ({ ...props }) => {
  const classes = styles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // delete when connecting to the DB
  // const [leadsData] = useState(leads);
  // const leadsLoading = false;

  const { leadsData, leadsLoading } = useSelector(state => ({
    leadsData: state.getIn(['dashboard', 'leadsData']),
    leadsLoading: state.getIn(['dashboard', 'leadsLoading']),
  }));

  useEffect(() => {
    dispatch(getLeadsLaunched());
  }, [dispatch])

  const responsive = {
    xl: {
      breakpoint: { max: 3000, min: 1500 },
      items: 3,
      partialVisibilityGutter: 25,
    },
    desktop: {
      breakpoint: { max: 1500, min: 800 },
      items: 2,
      partialVisibilityGutter: 25
    },
    tablet: {
      breakpoint: { max: 800, min: 0 },
      items: 1,
      partialVisibilityGutter: 100
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
      partialVisibilityGutter: 0
    }
  };

  let draftsList = (
    <DarkWrapper isBleed alignItems='center'>
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

  if (leadsData?.length > 0 && !leadsLoading) {
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
        {leadsData?.map((draft, key) => <Draft key={key} draft={draft} />)}
      </Carousel>
    )
  };

  const draftsNumber = leadsData?.length > 0 ? ('0' + leadsData?.length).slice(-2) : null

  return (
    <Box mt={'40px'}>
      <Typography variant='h2'>{draftsNumber} {t('draft.briefsTitle')}</Typography>
      {draftsList}
    </Box>
  );
};

export default Drafts;
