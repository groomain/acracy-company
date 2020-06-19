import { all, put, takeLatest, delay } from 'redux-saga/effects';
import {API} from 'aws-amplify';
import {
  getBriefSuccess, getBriefFailure,
  validateProfilesSuccess, validateProfilesFailure, contactAcracySuccess, contactAcracyFailure
} from './reducer';
import {config} from "../../conf/amplify";
import quotesMock from '../../mock/quotes'

function* getBrief(action) {
  try {
    // const {companyId,
    //   // briefId,
    //   // quotesData
    // } = action.payload;

    // CHECK COMPANY INFORMATIONS
    // const company = yield API.get(config.apiGateway.NAME, `/company/${companyId}`, {
    //   headers: {
    //     'x-api-key': config.apiKey
    //   }
    // });
    // if (!company.siret || !company.socialReason || !company.legalForm || !company.shareCapital) {
    //   yield put(getBriefFailure({messsage: "MissingInfos", code: 409}));
    // }
    let briefId = 'get_IN_PROGRESS';

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

    yield put(getBriefSuccess({briefData: briefData, quotesData: quotesMock}));
  } catch (err) {
    yield put(getBriefFailure(err));
  }
}

function* validateProfiles(action) {
  try {
    const {type, listId, text, reason} = action.payload;
    const body = {};
    if (type === 'ACCEPTE_QUOTES') {
      body.type = type;
      body.payload.basket = listId
    } else if (type === 'REFUSE_ALL_QUOTES') {
      body.type = type;
      body.text = text;
      body.reason = reason;
    }
    console.log("BODY", body);
    let id = 'get_IN_PROGRESS';
    const validateProfiles = yield API.post(config.apiGateway.NAME, `/quotes`, {
      headers: {
        'x-api-key': config.apiKey
      },
      body: body
    });

    yield put(validateProfilesSuccess(validateProfiles));
  } catch (err) {
    console.log(err);
    yield put(validateProfilesFailure(err));
  }
}

function* contactAcracy(action) {
  try {
    const {message} = action.payload;
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
