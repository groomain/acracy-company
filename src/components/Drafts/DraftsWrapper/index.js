import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core/';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import FirstDraft from '../Draft/FirstDraft';
import Draft from '../Draft';
import DraftsPagination from '../DraftsPagination/';
import CustomLoader from '../../Loader';

const Drafts = ({ drafts, loading, ...props }) => {
  const classes = styles();
  const { t } = useTranslation();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1200, min: 900 },
      items: 2,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 900, min: 0 },
      items: 1,
      partialVisibilityGutter: 30
    }
  };

  let draftsList = (
    <Grid
      container
      className={classes.draftsWrapper}
    >
      {!loading ? (
        <FirstDraft />
      ) : (
          <Box mx='auto'>
            <CustomLoader size={70} />
          </Box>
        )
      }
    </Grid>
  );

  if (drafts.length > 0 && !loading) {
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
        {drafts.map((draft, key) => <Draft draft={draft} key={key} />)}
      </Carousel>
    )
  };

  const draftsNumber = drafts.length > 0 ? ('0' + drafts.length).slice(-2) : null

  return (
    <>
      <Typography variant='h2'>{draftsNumber} {t('draft.briefsTitle')}</Typography>
      <br />
      {draftsList}
    </>
  );
};

export default Drafts;
