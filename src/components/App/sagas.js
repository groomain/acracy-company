import {
  all, put, takeLatest, call
} from 'redux-saga/effects';
import { API, Auth } from 'aws-amplify';
import { push } from 'connected-react-router';
import {
  getCurrentSessionSuccess,
  getCurrentSessionFailure,
  getCurrentSessionLaunched,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  signupSuccess,
  signupFailure,
  requestPasswordCodeFailure,
  requestPasswordCodeSuccess,
  submitNewPasswordSuccess,
  submitNewPasswordFaliure,
  updateUserFailure,
  updateUserSuccess
} from './reducer';
import {
  translateSignInError,
  translateSignUpError,
  translateConfirmForgotPassword,
  translateForgotPassword
} from '../../utils/cognito';
import { config } from '../../conf/amplify';

function* getCurrentSession(action) {
  const { fromPath } = action.payload;
  try {
    yield Auth.currentSession();
    const userInfo = yield Auth.currentUserInfo();
    const userDynamo = yield API.post(config.apiGateway.NAME, '/sessions', {
      headers: {
        'x-api-key': config.apiKey
      },
      body: {
        email: userInfo.attributes.email
      }
    });

    yield put(getCurrentSessionSuccess({ userInfo, userDynamo }));
    if (fromPath) {
      yield put(push(fromPath));
    }
  } catch (error) {
    console.log(error);
    yield put(getCurrentSessionFailure());
  }
}

function* doSignIn(action) {
  const { email, password, from } = action.payload;

  try {
    yield Auth.signIn(email, password);
    yield put(loginSuccess());
  } catch (err) {
    yield put(loginFailure(translateSignInError(err.code)));
  }
  yield put(getCurrentSessionLaunched({ fromPath: from || '/home' }));
}

function* doSignOut() {
  try {
    yield Auth.signOut();
    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutFailure());
  }
  yield put(getCurrentSessionLaunched('/home'));
}

function* doSignUp(action) {
  const { email, password, companyName, firstName, lastName, role, phonePrefix, phoneNumber, searchType, searchValue, searchCode } = action.payload;
  try {
    yield Auth.signUp({
      username: email,
      password,
      'attributes': {
        'custom: companyName': companyName,
        'custom: firstName': firstName,
        'custom: lastName': lastName,
        'custom: role': role,
        email,
        'custom: phoneNumberCode': phonePrefix,
        'custom: phoneNumberNumber': phoneNumber,
        'custom: searchType': searchType,
        'custom: searchValue': searchValue,
        'custom: searchCode': searchCode
      }
    });
    yield call(doSignIn, { payload: { email, password } });
    yield put(signupSuccess());
    yield put(push('/confirm-signup', { email: email }));
  } catch (error) {
    console.log(error);
    yield put(signupFailure(translateSignUpError(error.code)));
  }
}

function* doRequestPasswordCode(action) {
  console.log(action);
  const { email } = action.payload;

  try {
    yield Auth.forgotPassword(email);
    yield put(requestPasswordCodeSuccess());
  } catch (error) {
    yield put(requestPasswordCodeFailure(translateForgotPassword(error.code)));
  }
}

function* doSubmitNewPassword(action) {
  console.log(action);
  const {
    email, code, password
  } = action.payload;
  try {
    yield Auth.forgotPasswordSubmit(email, code, password);
    yield put(submitNewPasswordSuccess());
  } catch (error) {
    yield put(submitNewPasswordFaliure(translateConfirmForgotPassword(error.code)));
  }
}

function* doUpdateUser(action) {
  console.log(action);
  const { firstName, lastName, userId } = action.payload;
  try {
    const apiURL = `/users/${userId}`;
    const params = {
      headers: {
        'x-api-key': config.apiKey
      },
      body: {
        lastName,
        firstName
      }
    };

    yield API.put(config.apiGateway.NAME, apiURL, params);
    yield put(updateUserSuccess());
  } catch (error) {
    yield put(updateUserFailure());
  }
  yield put(getCurrentSessionLaunched('/home'));
}


export default function* rootSaga() {
  yield all([
    takeLatest('App/getCurrentSessionLaunched', getCurrentSession),
    takeLatest('App/loginLaunched', doSignIn),
    takeLatest('App/logoutLaunched', doSignOut),
    takeLatest('App/signupLaunched', doSignUp),
    takeLatest('App/requestPasswordCodeLaunched', doRequestPasswordCode),
    takeLatest('App/submitNewPasswordLaunched', doSubmitNewPassword),
    takeLatest('App/updateUserLaunched', doUpdateUser)
  ]);
}
