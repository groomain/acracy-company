import { all, put, takeLatest } from 'redux-saga/effects';
import {API, Auth} from 'aws-amplify';
import { getSelectionProfilSuccess, getSelectionProfilFailure } from './reducer';
import {config} from "../../conf/amplify";

function* getSelectionProfil(action) {
  try {
    const apiURL = `/users/${action.userId}`;
    const params = {
      headers: {
        'x-api-key': config.apiKey
      },
      body: {

      }
    };

    yield API.put(config.apiGateway.NAME, apiURL, params);
    yield put(getSelectionProfilSuccess());
  } catch (err) {
    yield put(getSelectionProfilFailure());
  }
}

export default function* SelectionProfil() {
  yield all([
    takeLatest('SelectionProfil/getSelectionProfilLaunched', getSelectionProfil),
  ]);
}
