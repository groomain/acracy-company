import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const Main = ({ children }) => {
  return (
    <Grid item xs={12} md={6}>
      <Container>
        <Grid container justify="center">
          <Grid item xs={12} md={9}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Main;
