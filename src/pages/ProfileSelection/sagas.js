import {
  all, put, takeLatest, delay
} from 'redux-saga/effects';
import { API } from 'aws-amplify';
import { push } from 'connected-react-router';
import {
  getBriefSuccess, getBriefFailure,
  validateProfilesSuccess, validateProfilesFailure, contactAcracySuccess, contactAcracyFailure
} from './reducer';
import { config } from '../../conf/amplify';
import { openSnackBar } from '../../components/App/reducer';


function* getBrief(action) {
  try {
    const { companyId, briefId } = action.payload;

    // Ne focntionne pas pour le moment. A vérifier et corriger
    // CHECK COMPANY INFORMATIONS
    // const company = yield API.get(config.apiGateway.NAME, `/company/${companyId}`, {
    //   headers: {
    //     'x-api-key': config.apiKey
    //   }
    // });
    // if (!company.administrativeProfile.siret || !company.administrativeProfile.socialReason || !company.administrativeProfile.legalForm || !company.administrativeProfile.shareCapital) {
    //   yield put(getBriefFailure({ message: "MissingInfos", code: 409 }));
    // }

    // GET BRIEF INFORMATIONS
    const briefData = yield API.get(config.apiGateway.NAME, `/briefs/${briefId.id}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });

    // GET QUOTES DATA
    const quotesData = yield API.get(config.apiGateway.NAME, `/quotes?briefId=${briefId.id}&status=WAITING_FOR_CUSTOMER`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });

    yield put(getBriefSuccess({ briefData, quotesData }));
  } catch (err) {
    yield put(getBriefFailure(err));
    yield put(openSnackBar({ message: 'Une erreur est survenue', error: true }));
  }
}

function* validateProfiles(action) {
  try {
    const {
      type, listId, text, reason, quoteId
    } = action.payload;
    const body = {};
    if (type === 'ACCEPT_QUOTES') {
      body.type = type;
      body.payload = { basket: listId };
    } else if (type === 'REFUSE_ALL_QUOTES') {
      body.type = type;
      body.payload = {
        reasonForRefusal: reason,
        messageForRefusal: text
      };
    }
    const validateProfiles = yield API.post(config.apiGateway.NAME, `/briefs/${quoteId}/actions`, {
      headers: {
        'x-api-key': config.apiKey
      },
      body
    });

    yield put(validateProfilesSuccess(validateProfiles));
    yield put(push('/home'));
  } catch (err) {
    console.log(err);
    yield put(validateProfilesFailure(err));
    yield put(openSnackBar({ message: 'Une erreur est survenue', error: true }));
  }
}

function* contactAcracy(action) {
  const {
    message, reason, interview, selectedProfiles
  } = action.payload;
  let sendMessage;

  try {
    if (interview) {
      sendMessage = yield API.post(config.apiGateway.NAME, '/messages', {
        headers: {
          'x-api-key': config.apiKey
        },
        body: {
          type: 'COMPANY_JOB_INTERVIEW',
          payload: {
            message: selectedProfiles.toString()
          }
        }
      });
      yield put(openSnackBar({ message: '👉 N’oubliez pas de mettre à jour votre sélection de profils une fois les entretiens passés' }));
    } else {
      sendMessage = yield API.post(config.apiGateway.NAME, '/messages', {
        headers: {
          'x-api-key': config.apiKey
        },
        body: {
          type: 'COMPANY_EMPLOYEE_CONTACT',
          payload: {
            reason,
            message
          }
        }
      });
      yield put(openSnackBar({ message: 'Votre message a été envoyé avec succès' }));
    }
    yield put(contactAcracySuccess(sendMessage));
  } catch (err) {
    console.log(err);
    yield put(contactAcracyFailure(err));
    yield put(openSnackBar({ message: "Erreur lors de l'envoi de votre message", error: true }));
  }
}

export default function* SelectionProfil() {
  yield all([
    takeLatest('SelectionProfil/getBriefLaunched', getBrief),
    takeLatest('SelectionProfil/validateProfilesLaunched', validateProfiles),
    takeLatest('SelectionProfil/contactAcracyLaunched', contactAcracy),
  ]);
}
