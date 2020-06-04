import { all, put, takeLatest } from 'redux-saga/effects';
import {API, Auth} from 'aws-amplify';
import { getSelectionProfilSuccess, getSelectionProfilFailure } from './reducer';
import {config} from "../../conf/amplify";

function* getSelectionProfil(action) {
  try {
    let missionId = 'get_IN_PROGRESS';
    const missionData = yield API.get(config.apiGateway.NAME, `/brief/${missionId}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });
    console.log("missionData", missionData);

    yield put(getSelectionProfilSuccess(missionData));
  } catch (err) {
    yield put(getSelectionProfilFailure(err));
  }
}

export default function* SelectionProfil() {
  yield all([
    takeLatest('SelectionProfil/getSelectionProfilLaunched', getSelectionProfil),
  ]);
}
