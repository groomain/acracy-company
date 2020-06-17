import {all, put, takeLatest} from 'redux-saga/effects';
import { API } from 'aws-amplify';
import {
} from './reducer';
import { config } from '../../conf/amplify';
import {downloadFileFailure} from "./reducer";
import {downloadFileSuccess} from "./reducer";

function* downloadFile(action) {
  try {
    const {type, id, attachmentId} = action.payload;
    console.log("DOWNLOADFILE", action.payload);
    let url;
    if (type === "brief") {
      url = `/leads/${id}/attachments/${attachmentId}`
    } else if (type === "devis") {
      url = `/leads/${id}/attachments/${attachmentId}`
    } else if (type === "facture") {
      url = `/leads/${id}/attachments/${attachmentId}`
    }
    const file = yield API.get(config.apiGateway.NAME, url, {
      headers: {
        'x-api-key': config.apiKey
      }
    });
    window.open(file);
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
