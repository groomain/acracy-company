import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router/immutable';
import configureStore, { history } from './configureStore';
import '../conf/i18n';
import { theme } from './configureMaterialTheme';
import CssBaseline from '@material-ui/core/CssBaseline';

const store = configureStore();

const ProviderWrapper = children => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        {children}
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

export default ProviderWrapper;
