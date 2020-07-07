import { all, put, takeLatest, delay } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import { getCompanySuccess, getCompanyFailure, putCompanySuccess, putCompanyFailure } from './reducer';
import { config } from '../../conf/amplify';
import { push } from "connected-react-router";
import { openSnackBar } from "../../components/App/reducer";
import companyMock from '../../mock/company'

function* getCompany(action) {
  try {
    let companyData = companyMock;
    // const companyData = yield API.get(config.apiGateway.NAME, `/companies/${id}`, {
    //   headers: {
    //     'x-api-key': config.apiKey
    //   }
    // });

    yield delay(2000); // for mock
    yield put(getCompanySuccess(companyData));
  } catch (error) {
    console.log(error);
    yield put(getCompanyFailure());
    yield put(openSnackBar({ message: "Une erreur est survenue", error: true }));
    yield put(push('/'));
  }
}

function* doUpdateCompany(action) {
  console.log('action :', action);
  try {
    let companyData = companyMock;
    //     const companyData = yield API.put(config.apiGateway.NAME, `/companies/${id}`, {
    //       header: {
    //         'x-api-key': config.apiKey
    //       },
    // body: action.payload
    // })
    yield put(putCompanySuccess(companyData))

  } catch (error) {
    yield put(putCompanyFailure())
    yield put(openSnackBar({ message: "Une erreur est survenue", error: true }));
  }

}

export default function* administrativeSaga() {
  yield all([
    takeLatest('Administrative/getCompanyLaunched', getCompany),
    takeLatest('Administrative/putCompanyLaunched', doUpdateCompany)
  ]);
}
