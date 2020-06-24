import { all, put, takeLatest } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import { push } from 'connected-react-router';
import { config } from '../../conf/amplify';
import { leadSaveSuccess, leadSaveFailure, getLeadDraftSuccess, getLeadDraftFailure, putLeadDraftSuccess, putLeadDraftFailure, changeLeadStatusSuccess, changeLeadStatusFailure } from "./reducer";

function* doLeadSave(action) { // create a new lead
  // console.log('action: ', action.payload)
  const { form, redirect } = action.payload;
  try {
    const leadId = yield API.post(config.apiGateway.NAME, '/leads', {
      headers: {
        'x-api-key': config.apiKey
      },
      body: form
    });

    yield put(leadSaveSuccess(leadId));
    if (redirect) {
      yield put(push('/home'));
    }
  } catch (error) {
    console.log(error);
    yield put(leadSaveFailure());
  }
}

function* doGetLeadDraft(action) { // get a lead's data
  // console.log('action: ', action.payload)
  const { id } = action.payload;
  try {
    const draft = yield API.get(config.apiGateway.NAME, encodeURI(`/leads/${id}`),
      {
        headers: {
          'x-api-key': config.apiKey
        }
      });

    yield put(getLeadDraftSuccess(draft));
  } catch (error) {
    console.log(error);
    yield put(getLeadDraftFailure());
  }
}

function* doUpdateLeadDraft(action) { // update an existing lead
  // console.log('action: ', action.payload)
  const { id, form, redirect } = action.payload;
  try {
    const draft = yield API.put(config.apiGateway.NAME, encodeURI(`/leads/${id}`),
      {
        headers: {
          'x-api-key': config.apiKey
        },
        body: form

      });

    yield put(putLeadDraftSuccess(draft));
    if (redirect) {
      yield put(push('/home'));
    }
  } catch (error) {
    console.log(error);
    yield put(putLeadDraftFailure());
  }
}

function* doChangeLeadStatus(action) {  // modify the status of a lead
  // console.log('action: ', action.payload)
  const { id, status } = action.payload;
  try {
    const update = yield API.post(config.apiGateway.NAME, encodeURI(`/leads/${id}/actions/`),
      {
        headers: {
          'x-api-key': config.apiKey
        },
        body: { 'type': status }
      });
    yield put(changeLeadStatusSuccess(update));
    yield put(push('/home'));
  } catch (error) {
    console.log(error);
    yield put(changeLeadStatusFailure());
  }
}

export default function* LeadCreationSaga() {
  yield all([
    takeLatest('LeadCreation/leadSaveLaunched', doLeadSave),
    takeLatest('LeadCreation/getLeadDraftLaunched', doGetLeadDraft),
    takeLatest('LeadCreation/putLeadDraftLaunched', doUpdateLeadDraft),
    takeLatest('LeadCreation/changeLeadStatusLaunched', doChangeLeadStatus)
  ]);
}