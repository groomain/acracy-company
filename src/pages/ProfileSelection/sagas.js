import { all, put, takeLatest } from 'redux-saga/effects';
import {API, Auth} from 'aws-amplify';
import {
  getSelectionProfilSuccess,
  getSelectionProfilFailure,
  validateProfilesSuccess,
  validateProfilesFailure
} from './reducer';
import {config} from "../../conf/amplify";

function* getSelectionProfil(action) {
  try {
    let missionId = 'get_IN_PROGRESS';
    const missionData = yield API.get(config.apiGateway.NAME, `/briefs/${missionId}`, {
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

function* validateProfiles(action) {
  try {
    console.log("validateProfiles SAGA");
    let id = 'get_IN_PROGRESS';
    const validateProfiles = yield API.post(config.apiGateway.NAME, `/quotes`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });
    console.log("missionData", validateProfiles);

    yield put(validateProfilesSuccess(validateProfiles));
  } catch (err) {
    console.log(err);
    yield put(validateProfilesFailure(err));
  }
}

export default function* SelectionProfil() {
  yield all([
    takeLatest('SelectionProfil/getSelectionProfilLaunched', getSelectionProfil),
    takeLatest('SelectionProfil/validateProfilesLaunched', validateProfiles),
  ]);
}
