const config = {
  AWS_REGION: process.env.REACT_APP_AWS_REGION,
  apiGateway: {
    URL: process.env.REACT_APP_APIGATEWAY_URL,
    NAME: process.env.REACT_APP_API_NAME
  },
  cognito: {
    USER_POOL_ID: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID
  },
  apiKey: process.env.REACT_APP_APIKEY
};

const amplifyConfig = {
  Auth: {
    mandatorySignIn: true,
    region: config.AWS_REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  },
  API: {
    endpoints: [
      {
        name: config.apiGateway.NAME,
        endpoint: config.apiGateway.URL,
        region: config.AWS_REGION
      }
    ]
  }
};

const share = {
  front: {
    url: process.env.REACT_APP_URL_FRONT
  }
};

export { config, amplifyConfig, share };
