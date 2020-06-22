import { all, put, takeLatest, call } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import { config } from "../../conf/amplify";
import {
  getLeadsSuccess,
  getLeadsFailure,
  deleteLeadSuccess,
  deleteLeadFailure,
  getMissionsSuccess,
  getMissionsFailure,
  getBriefsSuccess,
  getBriefsFailure,
  getQuotesSuccess,
  getQuotesFailure,
  getCompaniesSuccess,
  getCompaniesFailure
} from './reducer';

// Infos for the "drafts" section (carousel)
function* doGetLeads(action) {
  try {
    const apiURL = `/leads?include-status[]=DRAFT&include-status[]=HELP_NEEDED`;
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
  console.log('function*doDeleteLead -> leadId', leadId)
  try {
    const apiURL = `/leads/${leadId}/actions`;
    const params = {
      headers: {
        'x-api-key': config.apiKey
      },
      body: {
        'type': 'DELETE'
      }
    };

    yield API.put(config.apiGateway.NAME, apiURL, params);
    yield put(deleteLeadSuccess(action.payload));
    yield call(doGetLeads());
  } catch (err) {
    console.log('function*doDeleteLead -> err', err)
    yield put(deleteLeadFailure());
  }
}

// Every mission except the "profile matching" section
function* doGetMissions(action) {
  try {
    const apiURL = `/missions`;
    const params = {
      headers: {
        'x-api-key': config.apiKey
      },
      body: {}
    };

    const missions = yield API.get(config.apiGateway.NAME, apiURL, params);
    yield put(getMissionsSuccess(missions));
  } catch (err) {
    console.log('function*doGetMissions -> err', err)
    yield put(getMissionsFailure());
  }
}

// Infos for the "profile matching" section
function* doGetBriefs(action) {
  try {
    const apiURL = `/briefs?exclude-status[]=CLOSED&exculde-status[]=ABANDONED&exclude-status[]=IN_PROGRESS`;
    const params = {
      headers: {
        'x-api-key': config.apiKey
      },
      body: {}
    };

    const briefs = yield API.get(config.apiGateway.NAME, apiURL, params);
    yield put(getBriefsSuccess(briefs));
  } catch (err) {
    console.log('function*doGetBriefs -> err', err)
    yield put(getBriefsFailure());
  }
}

// Get infos on the associated freelance
function* doGetQuotes(action) {
  const briefId = action.payload;
  try {
    const apiURL = `/quotes?briefId=${briefId}`;
    const params = {
      headers: {
        'x-api-key': config.apiKey
      },
      body: {}
    };

    const quotes = yield API.get(config.apiGateway.NAME, apiURL, params);
    yield put(getQuotesSuccess(quotes));
  } catch (error) {
    console.log(error);
    yield put(getQuotesFailure());
  }
}

// Get the company's infos before redirection to the reveals page
function* doGetCompanies(action) {
  const companyId = action.payload;
  try {
    const apiURL = `/companies/${companyId}`;
    const params = {
      headers: {
        'x-api-key': config.apiKey
      },
      body: {}
    };

    const companies = yield API.get(config.apiGateway.NAME, apiURL, params);
    yield put(getCompaniesSuccess(companies));
  } catch (error) {
    console.log(error);
    yield put(getCompaniesFailure());
  }
}

export default function* dashboardSagas() {
  yield all([
    takeLatest('Leads/getLeadsLaunched', doGetLeads),
    takeLatest('Leads/deleteLeadLaunched', doDeleteLead),
    takeLatest('Leads/getMissionsLaunched', doGetMissions),
    takeLatest('Leads/getBriefsLaunched', doGetBriefs),
    takeLatest('Leads/getQuotesLaunched', doGetQuotes),
    takeLatest('Leads/getCompaniesLaunched', doGetCompanies)
  ])
}
