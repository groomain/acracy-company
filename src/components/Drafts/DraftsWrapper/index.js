import React from 'react';
import { Grid, Box, Typography, CircularProgress } from '@material-ui/core/';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import Draft from '../Draft';
import { formatWithLineBreak } from '../../../utils/format';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DraftsPagination from '../DraftsPagination/';

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
        <Box textAlign="center" style={{ width: '100%' }}>
          <Typography variant='h2' className={classes.noDrafts}>{formatWithLineBreak(t('noDraft'))}</Typography>
        </Box>
      ) : (
          <Box mx='auto'>
            <CircularProgress color="primary" size={30} />
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

  return (
    <>
      <Typography variant='h2'>{t('briefsTitle')}</Typography>
      <br />
      {draftsList}
    </>
  );
};

export default Drafts;
