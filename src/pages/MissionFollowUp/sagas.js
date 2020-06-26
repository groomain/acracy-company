import {all, put, takeLatest} from 'redux-saga/effects';
import { API } from 'aws-amplify';
import {
  getMissionSuccess,
  getMissionFailure,
  getBriefSuccess,
  getBriefFailure,
} from './reducer';
import { config } from '../../conf/amplify';
import {push} from "connected-react-router";

function* getMission(action) {
  const { id } = action.payload;
  try {
    const missionData = yield API.get(config.apiGateway.NAME, `/missions/${id}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });

    yield put(getMissionSuccess(missionData));
  } catch (error) {
    console.log(error);
    yield put(getMissionFailure());
    yield put(push('/'));
  }
}

function* getBrief(action) {
  const { id } = action.payload;
  try {
    const briefData = yield API.get(config.apiGateway.NAME, `/briefs/${id}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });

    yield put(getBriefSuccess(briefData));
  } catch (error) {
    console.log(error);
    yield put(getBriefFailure());
    yield put(push('/'));
  }
}

export default function* missionSaga() {
  yield all([
    takeLatest('Mission/getMissionLaunched', getMission),
    takeLatest('Mission/getBriefLaunched', getBrief),
  ]);
}
