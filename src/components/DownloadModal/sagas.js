import {all, put, takeLatest} from 'redux-saga/effects';
import { API } from 'aws-amplify';
import {
} from './reducer';
import { config } from '../../conf/amplify';
import {downloadFileFailure} from "./reducer";
import {downloadFileSuccess} from "./reducer";

function* downloadFile(action) {
  try {
    console.log("DOWNLOADFILE", action.payload);
    // const file = yield API.get(config.apiGateway.NAME, `/brief/${briefId}`, {
    //   headers: {
    //     'x-api-key': config.apiKey
    //   }
    // });
    // window.open(file);
    yield put(downloadFileSuccess());
  } catch (error) {
    console.log(error);
    yield put(downloadFileFailure());
  }
}

export default function* downloadSaga() {
  yield all([
    takeLatest('Download/downloadFileLaunched', downloadFile),
  ]);
}
