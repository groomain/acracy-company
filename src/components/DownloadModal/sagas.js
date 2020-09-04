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
    const { type, attachmentId } = action.payload;
    let url = `/attachments`;

    let array;
    if (Array.isArray(attachmentId)) {
      array = attachmentId.slice();
    } else {
      array = [attachmentId];
    }

    for (let i = 0; i < array.length; i++) {
      try {
        const file = yield API.get(config.apiGateway.NAME, '/attachments/' + array[i], {
          headers: {
            'x-api-key': config.apiKey
          }
        });
        window.open(file.url, '_blank');
      } catch (error) {
        console.log(error);
        yield put(openSnackBar({ message: "Oups, une erreur est survenue", error: true }));
      }
    }
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
