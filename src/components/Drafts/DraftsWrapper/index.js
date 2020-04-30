import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import styles from './styles';
import { useTranslation } from 'react-i18next';
import Draft from '../Draft';
import { formatWithLineBreak } from '../../../utils/format';
import CircularProgress from '@material-ui/core/CircularProgress';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Drafts = ({ drafts, loading, ...props }) => {
  const classes = styles();
  const { t } = useTranslation();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1200, min: 850 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 850, min: 0 },
      items: 1,
    }
  };

  let draftsList = (
    <Box textAlign="center" style={{ width: '100%' }}>
      <Typography variant='h2' className={classes.noDrafts}>{formatWithLineBreak(t('noDraft'))}</Typography>
    </Box>
  );

  if (loading) {
    draftsList = (
      <Box mx='auto'>
        <CircularProgress color="primary" size={30} />
      </Box>
    )
  }

  if (drafts.length > 0 && !loading) {
    draftsList = drafts.map((draft, key) => <Draft draft={draft} key={key} />)
  };

  return (
    <Carousel
      responsive={responsive}
      className={classes.draftsWrapper}
      showDots
      renderDotsOutside
      {...props}
    >
      {draftsList}
    </Carousel>
  );
};

export default Drafts;
