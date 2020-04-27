import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { amplifyConfig } from './conf/amplify';
import App from './components/App';
// Configuration i18n
import ProviderWrapper from './utils/Provider';
import './index.css';
// AWS Amplify Configuration
Amplify.configure(amplifyConfig);

ReactDOM.render(
  ProviderWrapper(<App />),
  document.getElementById('root')
);
