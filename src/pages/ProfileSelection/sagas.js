import { all, put, takeLatest } from 'redux-saga/effects';
import {API} from 'aws-amplify';
import {
  getBriefSuccess, getBriefFailure,
  validateProfilesSuccess, validateProfilesFailure 
} from './reducer';
import {config} from "../../conf/amplify";

function* getBrief(action) {
  try {
    const {companyId,
      // briefId,
      // quotesData
    } = action.payload;

    // CHECK COMPANY INFORMATIONS
    const company = yield API.get(config.apiGateway.NAME, `/company/${companyId}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });
    if (!company.siret || !company.socialReason || !company.legalForm || !company.shareCapital) {
      yield put(getBriefFailure({messsage: "MissingInfos", code: 409}));
    }
    let briefId = 'get_IN_PROGRESS';

    // GET BRIEF INFORMATIONS
    const briefData = yield API.get(config.apiGateway.NAME, `/briefs/${briefId}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });
    console.log("missionData", briefData);

    // GET QUOTES DATA
    const quotesData = yield API.get(config.apiGateway.NAME, `/quotes?briefId=${briefId}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });
    console.log("quotesData", quotesData);

    yield put(getBriefSuccess(briefData, quotesData));
  } catch (err) {
    yield put(getBriefFailure(err));
  }
}

function* validateProfiles(action) {
  try {
    const {types, text, reason} = action.payload;
    console.log("TEXT", text);
    console.log("REASON", reason);
    let id = 'get_IN_PROGRESS';
    const validateProfiles = yield API.post(config.apiGateway.NAME, `/quotes`, {
      headers: {
        'x-api-key': config.apiKey
      },
      body: {
        types,
        text,
        reason
      }
    });
    console.log("missionData", validateProfiles);

    yield put(validateProfilesSuccess(validateProfiles));
  } catch (err) {
    console.log(err);
    yield put(validateProfilesFailure(err));
  }
}

export default function* SelectionProfil() {
  yield all([
    takeLatest('SelectionProfil/getBriefLaunched', getBrief),
    takeLatest('SelectionProfil/validateProfilesLaunched', validateProfiles),
  ]);
}
