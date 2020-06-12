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
  confirmSignupSuccess,
  confirmSignupFailure,
  requestPasswordCodeFailure,
  requestPasswordCodeSuccess,
  submitNewPasswordSuccess,
  submitNewPasswordFaliure,
  updateUserFailure,
  updateUserSuccess,
  resendCodeSuccess,
  resendCodeFailure
} from './reducer';
import {
  translateSignInError,
  translateSignUpError,
  translateConfirmForgotPassword,
  translateForgotPassword,
  translateConfirmSignUpError,
  translateConfirmSignUpSuccess,
  translateResendCodeSuccess,
  translateResendCodeError
} from '../../utils/cognito';
import { config } from '../../conf/amplify';
import { getPhonePrefixCode } from '../../utils/services/format';

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
    console.log('function*getCurrentSession -> userDynamo', userDynamo)

    if (!userDynamo?.company) {
      console.log('1');
      try {
        const params = {
          headers: {
            'x-api-key': config.apiKey
          },
          body: {
            'name': userInfo?.attributes['custom:companyName']
          }
        }
        userDynamo.company = yield API.put(config.apiGateway.NAME, '/companies', params)
      } catch (error) {
        console.log(error);
        yield put(loginFailure(translateSignInError(error.code)));
      }
      // yield put(push('/home'));
    };

    if (userDynamo?.company && !userDynamo?.employee) {
      console.log('2')
      try {
        const params = {
          headers: {
            'x-api-key': config.apiKey
          },
          body: {
            'companyId': userDynamo?.company.id,
            'email': userInfo?.attributes.email,
            'firstName': userInfo?.attributes['custom:firstName'],
            'lastName': userInfo?.attributes['custom:lastName'],
            'role': userInfo?.attributes['custom:role'],
            'phoneNumber': {
              'code': userInfo?.attributes['custom:phoneNumberCode'],
              'number': userInfo?.attributes['custom:phoneNumberNumber']
            }
          }
        }
        userDynamo.employee = yield put(config.apiGateway.NAME, '/employees', params);
      } catch (error) {
        console.log(error);
        yield put(loginFailure(translateSignInError(error.code)));
      }
      // yield put(push('/home'));
    };

    if (userDynamo?.company && userDynamo?.employee) {
      const userAttributes = userInfo?.attributes;
      console.log('3')
      if (userAttributes['custom:searchCode'] && userAttributes['custom:searchType'] && userAttributes['custom:searchValue']) {
        const params = {
          headers: {
            'x-api-key': config.apiKey
          },
          body: {
            'search': {
              'code': userAttributes['custom:searchCode'],
              'type': userAttributes['custom:searchType'],
              'text': userAttributes['custom:searchValue']
            }
          }
        }
        try {
          yield put(config.apiGateway.NAME, '/leads', params);
        } catch (error) {
          console.log(error);
          yield put(loginFailure(translateSignInError("Une erreur est survenue lors de la création du brief, merci de réessayer plus tard")));
        }
      }
      yield put(loginSuccess());
      // yield put(push('/home'));
    }

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
  const { password, from } = action.payload;
  const email = action.payload.trim().toLowerCase();
  try {
    yield Auth.signIn(email, password);
    yield put(loginSuccess());
  } catch (err) {
    console.log(err)
    if (err.code === 'UserNotConfirmedException') {
      yield Auth.resendSignUp(email)
      yield put(push('/confirm-signup', { email: email }));
      yield put(loginFailure(translateSignInError(err.code)));
    }
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
  const { password, companyName, firstName, lastName, role, phonePrefix, phoneNumber, searchType, searchValue, searchCode } = action.payload;
  const prefixCode = getPhonePrefixCode(phonePrefix);
  const email = action.payload.email.trim().toLowerCase();

  try {
    yield Auth.signUp({
      username: email,
      password,
      'attributes': {
        'custom:companyName': companyName,
        'custom:firstName': firstName,
        'custom:lastName': lastName,
        'custom:role': role,
        email,
        'custom:phoneNumberCode': prefixCode,
        'custom:phoneNumberNumber': phoneNumber,
        'custom:searchType': searchType,
        'custom:searchValue': searchValue,
        'custom:searchCode': searchCode
      }
    });
    yield put(signupSuccess());
    yield put(push('/confirm-signup', { email: email }));
  } catch (error) {
    console.log(error);
    yield put(signupFailure(translateSignUpError(error.code)));
  }
}

function* doConfirmSignUp(action) {
  const { code } = action.payload;
  const username = action.payload.username.trim().toLowerCase();
  try {
    yield Auth.confirmSignUp(username, code);
    yield put(push('/home'));
    yield put(confirmSignupSuccess(translateConfirmSignUpSuccess()));
  } catch (error) {
    console.log(error);
    yield put(confirmSignupFailure(translateConfirmSignUpError(error.code)));
  }
}

function* doResendCode(action) {
  const email = action.payload.trim().toLowerCase();
  try {
    yield Auth.resendSignUp(email);
    yield put(resendCodeSuccess(translateResendCodeSuccess()));
  } catch (error) {
    console.log(error);
    yield put(resendCodeFailure(translateResendCodeError(error.code)));
  }
}

function* doRequestPasswordCode(action) {
  console.log(action);
  const email = action.payload.email.trim().toLowerCase();

  try {
    yield Auth.forgotPassword(email);
    yield put(requestPasswordCodeSuccess(translateResendCodeSuccess()));
  } catch (error) {
    yield put(requestPasswordCodeFailure(translateForgotPassword(error.code)));
  }
}

function* doSubmitNewPassword(action) {
  console.log(action);
  const { code, password } = action.payload;
  const email = action.payload.trim().toLowerCase();
  try {
    yield Auth.forgotPasswordSubmit(email, code, password);
    yield put(submitNewPasswordSuccess());
    yield put(push('/home'));
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
    takeLatest('App/updateUserLaunched', doUpdateUser),
    takeLatest('App/confirmSignupLaunched', doConfirmSignUp),
    takeLatest('App/resendCodeLaunched', doResendCode),
  ]);
}
