import { put, takeLatest } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import { config } from "../../conf/amplify";
import {
  getLeadsSuccess,
  getLeadsFailure
} from './reducer';

function* doGetLeads(action) {
  try {
    const apiURL = `/leads?include-status[]=DRAFT&exclude-status[]=HELP_NEEDED`;
    const params = {
      headers: {
        'x-api-key': config.apiKey
      },
      body: {}
    };

    const leads = yield API.get(config.apiGateway.NAME, apiURL, params);
    yield put(getLeadsSuccess(leads));
  } catch (err) {
    console.log('function*doGetLeads -> err', err)
    yield put(getLeadsFailure());
  }
}

export const leadsSagas = [
  takeLatest('Leads/getLeadsLaunched', doGetLeads),
]
