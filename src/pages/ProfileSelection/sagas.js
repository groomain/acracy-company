import { all, put, takeLatest, delay } from 'redux-saga/effects';
import {API} from 'aws-amplify';
import {
  getBriefSuccess, getBriefFailure,
  validateProfilesSuccess, validateProfilesFailure, contactAcracySuccess, contactAcracyFailure
} from './reducer';
import {config} from "../../conf/amplify";
import {openSnackBar} from "../../components/App/reducer";

function* getBrief(action) {
  try {
    const {companyId, briefId} = action.payload;

    // CHECK COMPANY INFORMATIONS
    const company = yield API.get(config.apiGateway.NAME, `/company/${companyId}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });
    if (!company.siret || !company.socialReason || !company.legalForm || !company.shareCapital) {
      yield put(getBriefFailure({message: "MissingInfos", code: 409}));
    }

    // GET BRIEF INFORMATIONS
    const briefData = yield API.get(config.apiGateway.NAME, `/briefs/${briefId}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });

    // GET QUOTES DATA
    const quotesData = yield API.get(config.apiGateway.NAME, `/quotes?briefId=${briefId}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });

    yield put(getBriefSuccess({briefData: briefData, quotesData: quotesData}));
  } catch (err) {
    yield put(getBriefFailure(err));
    yield put(openSnackBar({message: "Une erreur est survenue", error: true}));
  }
}

function* validateProfiles(action) {
  try {
    const {type, listId, text, reason, quoteId} = action.payload;
    const body = {};
    if (type === 'ACCEPTE_QUOTES') {
      body.type = type;
      body.payload.basket = listId
    } else if (type === 'REFUSE_ALL_QUOTES') {
      body.type = type;
      body.text = text;
      body.reason = reason;
    }
    const validateProfiles = yield API.post(config.apiGateway.NAME, `/quotes/${quoteId}/actions`, {
      headers: {
        'x-api-key': config.apiKey
      },
      body: body
    });

    yield put(validateProfilesSuccess(validateProfiles));
  } catch (err) {
    console.log(err);
    yield put(validateProfilesFailure(err));
    yield put(openSnackBar({message: "Une erreur est survenue", error: true}));
  }
}

function* contactAcracy(action) {
  try {
    const {message, interview} = action.payload;
    let id = 'get_IN_PROGRESS';
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

export default function* SelectionProfil() {
  yield all([
    takeLatest('SelectionProfil/getBriefLaunched', getBrief),
    takeLatest('SelectionProfil/validateProfilesLaunched', validateProfiles),
    takeLatest('SelectionProfil/contactAcracyLaunched', contactAcracy),
  ]);
}
