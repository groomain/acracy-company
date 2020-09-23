import { all, put, takeLatest, delay } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import {
  getCompanySuccess,
  getCompanyFailure,
  putCompanySuccess,
  putCompanyFailure,
  getAttachmentsSuccess,
  getAttachmentsFailure,
  uploadAttachmentSuccess,
  uploadAttachmentFailure,
  deleteAttachmentSuccess,
  deleteAttachmentFailure,
  closeAdminSnackBar,
  clearAdminSnackBar,
  openAdminSnackBar
} from './reducer';
import { config } from '../../conf/amplify';
import { push } from "connected-react-router";
import {clearSnackBar, closeSnackBar, openSnackBar} from "../../components/App/reducer";

export function* getCompany(action) {
  try {
    // let companyData = companyMock;
    const companyData = yield API.get(config.apiGateway.NAME, `/companies/${action.payload}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });

    // yield delay(1000); // for mock
    yield put(getCompanySuccess(companyData));
  } catch (error) {
    console.log(error);
    yield put(getCompanyFailure());
    yield put(openSnackBar({ message: "Une erreur est survenue", error: true }));
    yield put(push('/'));
  }
}

function* doUpdateCompany(action) {
  try {
    const { companyId, ...rest } = action.payload;
    // let companyData = companyMock;
    const companyData = yield API.put(config.apiGateway.NAME, `/companies/${companyId}`, {
      headers: {
        'x-api-key': config.apiKey
      },
      body: rest
    })

    yield put(putCompanySuccess(companyData))
    yield put(openAdminSnackBar({ message: "Vos données ont bien été enregistrées", error: false }));
  } catch (error) {
    yield put(putCompanyFailure())
    yield put(openAdminSnackBar({ message: "Une erreur est survenue", error: true }));
  }
}




function* setAdminSnackBar() {
  yield delay(5000);
  yield put(closeAdminSnackBar());
  yield delay(200);
  yield put(clearAdminSnackBar());
}

export default function* administrativeSaga() {
  yield all([
    takeLatest('Administrative/getCompanyLaunched', getCompany),
    takeLatest('Administrative/putCompanyLaunched', doUpdateCompany),
    takeLatest('Administrative/openAdminSnackBar', setAdminSnackBar)
  ]);
}
