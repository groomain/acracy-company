import { all, put, takeLatest } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import { config } from '../../conf/amplify';
import { leadSaveSuccess, leadSaveFailure } from "./reducer";

function* doLeadSave(action) {
  // console.log('action: ', action.payload)
  try {

    const leads = yield API.post(config.apiGateway.NAME, '/leads', {
      headers: {
        'x-api-key': config.apiKey
      },
      body: action.payload
    });

    yield put(leadSaveSuccess());
  } catch (error) {
    console.log(error);
    yield put(leadSaveFailure());
  }
}

export default function* LeadCreationSaga() {
  yield all([
    takeLatest('LeadCreation/leadSaveLaunched', doLeadSave),
  ]);
}
