import {all, put, takeLatest} from 'redux-saga/effects';
import { API } from 'aws-amplify';
import {
  getMissionSuccess,
  getMissionFailure,
  getBriefSuccess,
  getBriefFailure,
} from './reducer';
import { config } from '../../conf/amplify';
import {push} from "connected-react-router";
import {openSnackBar} from "../../components/App/reducer";
import * as moment from 'moment';
import React from "react";
import {formatDateForComparaison} from "../../utils/services/format";

function* getBrief(action) {
  const { id } = action.payload;
  let briefData;
  try {
    briefData = yield API.get(config.apiGateway.NAME, `/briefs/${id}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });
    yield put(getBriefSuccess(briefData));
  } catch (error) {
    console.log(error);
    yield put(getBriefFailure());
    yield put(push('/'));
  }
  if (briefData.status === 'WAITING_FOR_ACCEPTANCE')  {
    yield put(openSnackBar({ message: "Brief déposé et en cours de validation ! Suivez ici l’avancement de votre mission.", error: false, emoji: <span role="img" aria-label="clap">👏</span> }));
  } else if (briefData.status === "WAITING_FOR_MATCHING" || briefData.status === "WAITING_FOR_QUOTES") {
    yield put(openSnackBar({ message: "Votre brief est validé : nous recherchons les profils répondant à vos attentes.", error: false, emoji: <span role="img" aria-label="classes">👓</span> }));
  }

  console.log("briefData", briefData);
}

function* getMission(action) {
  const { id } = action.payload;
  let missionData;
  try {
    missionData = yield API.get(config.apiGateway.NAME, `/missions/${id}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });

    yield put(getMissionSuccess(missionData));
  } catch (error) {
    console.log(error);
    yield put(getMissionFailure());
    yield put(push('/'));
  }
  const today = new Date(Date.now()).toISOString();
  if (missionData.status === "IN_PROGRESS" && (formatDateForComparaison(missionData.dateStart) > formatDateForComparaison(today))) {
    yield put(openSnackBar({ message: "C'est tout bon ! Votre mission peut démarrer.", error: false, emoji: <span role="img" aria-label="okay">👌</span>}));
  }
  else if (missionData.invoices.length !== 0) {
    missionData.invoices.map(yield (invoice) => {
      if (invoice.status === 'WAITING_FOR_VALIDATION') {
        put(openSnackBar({ message: "Il n'y a qu'à valider le compte-rendu d'activité pour lancer la facturation.", error: false, emoji: <span role="img" aria-label="pointing_right">👉</span> }));
      }
    })
  }
}

export default function* missionSaga() {
  yield all([
    takeLatest('Mission/getMissionLaunched', getMission),
    takeLatest('Mission/getBriefLaunched', getBrief),
  ]);
}
