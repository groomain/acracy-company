import { all, put, takeLatest } from 'redux-saga/effects';
import {API} from 'aws-amplify';
import { contactAcracySuccess, contactAcracyFailure } from './reducer';
import {config} from "../../conf/amplify";
import {openSnackBar} from "../../components/App/reducer";

function* contactAcracy(action) {
  try {
    const {message, reason, interview} = action.payload;

    const validateProfiles = yield API.post(config.apiGateway.NAME, `/messages`, {
      headers: {
        'x-api-key': config.apiKey
      },
      body: {
        type: "COMPANY_EMPLOYEE_CONTACT",
        payload: {
          reason: reason,
          message: message
        }      }
    });
    yield put(contactAcracySuccess(validateProfiles));
    if (interview) {
      yield put(openSnackBar({message: "👉 N’oubliez pas de mettre à jour votre sélection de profils une fois les entretiens passés"}));
    } else {
      yield put(openSnackBar({message: "Votre message a été envoyé avec succès"}));
    }
  } catch (err) {
    console.log(err);
    yield put(contactAcracyFailure(err));
    yield put(openSnackBar({message: "Erreur lors de l'envoi de votre message", error: true}));
  }
}

export default function* Contact() {
  yield all([
    takeLatest('Contact/contactAcracyLaunched', contactAcracy),
  ]);
}
