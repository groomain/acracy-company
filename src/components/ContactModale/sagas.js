import { all, put, takeLatest, delay } from 'redux-saga/effects';
import {API} from 'aws-amplify';
import { contactAcracySuccess, contactAcracyFailure } from './reducer';
import {config} from "../../conf/amplify";
import {openSnackBar} from "../../components/App/reducer";

function* contactAcracy(action) {
  try {
    const {message, interview} = action.payload;

    const validateProfiles = yield API.post(config.apiGateway.NAME, `/message`, {
      headers: {
        'x-api-key': config.apiKey
      },
      body: {
        message: message
      }
    });
    yield put(contactAcracySuccess(validateProfiles));
    if (interview) {
      yield put(openSnackBar({message: "👉 N’oubliez pas de metre à jour votre sélection de profils une fois les entretiens passés"}));
    }
  } catch (err) {
    console.log(err);
    yield put(contactAcracyFailure(err));
  }
}

export default function* Contact() {
  yield all([
    takeLatest('Contact/contactAcracyLaunched', contactAcracy),
  ]);
}
