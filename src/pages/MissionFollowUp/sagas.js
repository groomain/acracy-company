import {all, put, takeLatest} from 'redux-saga/effects';
import { API } from 'aws-amplify';
import {getMissionSuccess, getMissionFailure, getBriefSuccess, getBriefFailure} from './reducer';
import { config } from '../../conf/amplify';

function* getMission(action) {
  // const { missionId } = action.payload;
  try {
    let missionId = 'get_IN_PROGRESS';
    const missionData = yield API.get(config.apiGateway.NAME, `/missions/${missionId}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });
    console.log("SAGA missionData", missionData);

    yield put(getMissionSuccess(missionData));
  } catch (error) {
    console.log(error);
    yield put(getMissionFailure());
  }
}

function* getBrief(action) {
  // const { missionId } = action.payload;
  try {
    let briefId = 'get_IN_PROGRESS';
    const briefData = yield API.get(config.apiGateway.NAME, `/briefs/${briefId}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });

    yield put(getBriefSuccess(briefData));
  } catch (error) {
    console.log(error);
    yield put(getBriefFailure());
  }
}

export default function* missionSaga() {
  yield all([
    takeLatest('Mission/getMissionLaunched', getMission),
    takeLatest('Mission/getBriefLaunched', getBrief),
  ]);
}
