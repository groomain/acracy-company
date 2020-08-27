import { all, put, takeLatest } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import {
} from './reducer';
import { config } from '../../conf/amplify';
import { downloadFileFailure } from "./reducer";
import { downloadFileSuccess } from "./reducer";
import { openSnackBar } from '../App/reducer';

function* downloadFile(action) {
  try {
    // console.log("DOWNLOADFILE SAGA");
    const { type, attachmentId } = action.payload;
    let url = `/attachments`;

    if (Array.isArray(attachmentId)) {
      for (let i = 0; i < attachmentId.length; i++) {
        if (i === 0) {
          url += `?id=${attachmentId[i]}`
        } else {
          url += `,${attachmentId[i]}`
        }
      }
    } else {
      url += `/${attachmentId}`
    }
    // console.log("DOWNLOADFILE", action.payload);
    const file = yield API.get(config.apiGateway.NAME, url, {
      headers: {
        'x-api-key': config.apiKey
      }
    });
    window.open(file.url);
    yield put(downloadFileSuccess());
  } catch (error) {
    console.log(error);
    yield put(downloadFileFailure());
    yield put(openSnackBar({ message: "Oups, une erreur est survenue", error: true }));
  }
}

export default function* downloadSaga() {
  yield all([
    takeLatest('Download/downloadFileLaunched', downloadFile),
  ]);
}
