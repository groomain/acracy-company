import React from 'react';
import { Grid, Box, Typography, IconButton } from '@material-ui/core/';
import styles from './styles';
import 'react-multi-carousel/lib/styles.css';

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

const DraftsPagination = ({ goToSlide, carouselState }) => {
  const classes = styles();
  const { totalItems, currentSlide } = carouselState;

  let pages = [];
  for (let i = 0; i < totalItems; i++) {
    pages.push(<Typography variant='body2' key={i} style={{ color: i === currentSlide ? 'white' : '#565e56' }}>{i + 1} .&nbsp;</Typography>);
  }

  if (totalItems > 3) {
    return (
      <Box className={classes.pagination}>
        {/* // Pagination is not displayed but kept in case we need it some day */}
        <Grid
          container
          className={classes.paginationContainer}
          style={{ display: 'none' }}
        >
          {pages}
        </Grid>
        <IconButton
          className={classes.paginationButton}
          color="secondary"
          onClick={() => goToSlide(currentSlide > 1 ? currentSlide - 1 : 0)}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
        <IconButton
          className={classes.paginationButton}
          color="secondary"
          onClick={() => goToSlide(currentSlide < totalItems - 1 ? currentSlide + 1 : 0)}
        >
          <ArrowForwardRoundedIcon />
        </IconButton>
      </Box>
    )
  } else {
    return null
  }
}

export default DraftsPagination;
