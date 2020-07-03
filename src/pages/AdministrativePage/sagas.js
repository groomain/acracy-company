import {all, put, takeLatest, delay} from 'redux-saga/effects';
import { API } from 'aws-amplify';
import {getCompanySuccess, getCompanyFailure} from './reducer';
import { config } from '../../conf/amplify';
import {push} from "connected-react-router";
import {openSnackBar} from "../../components/App/reducer";
import companyMock from '../../mock/company'

function* getCompany(action) {
  try {
    // const companyData = yield API.get(config.apiGateway.NAME, `/companies/${id}`, {
    //   headers: {
    //     'x-api-key': config.apiKey
    //   }
    // });

    yield delay(3000); // for mock
    yield put(getCompanySuccess(companyMock));
  } catch (error) {
    console.log(error);
    yield put(getCompanyFailure());
    yield put(openSnackBar({message: "Une erreur est survenue", error: true}));
    yield put(push('/'));
  }
}

export default function* administrativeSaga() {
  yield all([
    takeLatest('Administrative/getCompanyLaunched', getCompany),
  ]);
}
