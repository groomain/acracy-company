import { API } from 'aws-amplify';
import { config } from '../../conf/amplify';

/**
 * This function receives an endpoint and a body and posts data to the DB according to these arguments
 * @param {OptionsConfig} optionsConfig - The options configuration object
 * @returns {function} - The .post() method
 */
const launchPostFunction = ({ endpoint, body }) => {
  return API.post(config.apiGateway.NAME, endpoint, {
    headers: {
      'x-api-key': config.apiKey
    },
    body
  })
};

export { launchPostFunction };