import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core/';
import styles from './styles';

const DarkWrapper = ({ children, justify, direction, alignItems, alignContent, isBleed, ...props }) => {
  const classes = styles();
  return (
    <Grid container
      className={clsx(classes.darkWrapper, isBleed ? classes.bleed : null)}
      justify={justify}
      alignItems={alignItems}
      direction={direction}>
      {children}
    </Grid>
  )
};

DarkWrapper.propTypes = {
  children: PropTypes.node,
  /**
   * Defines how children are horizontally aligned, based on flexbox values
   */
  justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
  isBleed: PropTypes.bool
};

DarkWrapper.defaultProps = {
  children: null,
  justify: 'flex-start',
  isBleed: false
};

export default DarkWrapper;