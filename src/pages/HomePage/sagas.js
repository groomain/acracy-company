import { put, takeLatest, call } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import { config } from "../../conf/amplify";
import {
  getLeadsSuccess,
  getLeadsFailure,
  deleteLeadSuccess,
  deleteLeadFailure
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

function* doDeleteLead(action) {
  const leadId = action.payload;
  try {
    // const apiURL = `/leads/{leadId}`;
    // const params = {
    //   headers: {
    //     'x-api-key': config.apiKey
    //   },
    //   body: {
    //     'status': 'DELETED'
    //   }
    // };

    // yield API.put(config.apiGateway.NAME, apiURL, params);
    yield put(deleteLeadSuccess(action.payload));
    yield call(doGetLeads());
  } catch (err) {
    console.log('function*doGetLeads -> err', err)
    yield put(deleteLeadFailure());
  }
}

export const leadsSagas = [
  takeLatest('Leads/getLeadsLaunched', doGetLeads),
  takeLatest('Leads/deleteLeadLaunched', doDeleteLead),
]
