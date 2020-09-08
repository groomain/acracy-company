import React from 'react';
import { Grid } from '@material-ui/core';

import styles from './styles';
import {useHistory} from "react-router-dom";

const DraftWrapper = ({ children, to, onClick, ...props }) => {
  const classes = styles();
    const history = useHistory();
  return (
          <Grid className={classes.draft} onClick={() =>  {
              history.push(to ? to : '/');
              onClick()
          }} {...props}>
      {children}
          </Grid>
  );
};

export default DraftWrapper;
