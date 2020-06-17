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
    try {
      yield Auth.currentSession();
      const userInfo = yield Auth.currentUserInfo();
      // After signin, get the user's infos
      let userDynamo = yield API.post(config.apiGateway.NAME, '/sessions', {
        headers: {
          'x-api-key': config.apiKey
        },
        body: {
          email: userInfo.attributes.email
        }
      });

      if (userDynamo) {
        // Create the company
        if (!userDynamo?.companyId) {
          try {
            userDynamo.companyId = yield API.post(config.apiGateway.NAME, '/companies', {
              headers: {
                'x-api-key': config.apiKey
              },
              body: {
                'name': userInfo?.attributes['custom:companyName']
              }
            })
          } catch (error) {
            console.log(error);
            yield put(loginFailure(translateSignInError(error.code)));
          }
        }
        // Create the related employee + create the 1st lead if search infos are present
        // (the employeeId condition ensures the lead is created only once)
        if (userDynamo.companyId && !userDynamo?.employeeId) {
          try {
            userDynamo.employeeId = yield API.post(config.apiGateway.NAME, '/employees', {
              headers: {
                'x-api-key': config.apiKey
              },
              body: {
                'companyId': userDynamo?.companyId,
                'email': userInfo?.attributes.email,
                'firstName': userInfo?.attributes['custom:firstName'],
                'lastName': userInfo?.attributes['custom:lastName'],
                'role': userInfo?.attributes['custom:role'],
                'phoneNumber': {
                  'code': userInfo?.attributes['custom:phoneNumberCode'],
                  'number': userInfo?.attributes['custom:phoneNumberNumber']
                }
              }
            });
          } catch (error) {
            console.log(error);
            yield put(loginFailure(translateSignInError(error.code)));
          }
          if (userDynamo?.companyId && userDynamo?.employeeId && !userDynamo?.search) {
            const userAttributes = userInfo?.attributes;
            if (userAttributes['custom:searchCode'] && userAttributes['custom:searchType'] && userAttributes['custom:searchText']) {
              try {
                userDynamo.search = yield API.post(config.apiGateway.NAME, '/leads', {
                  headers: {
                    'x-api-key': config.apiKey
                  },
                  body: {
                    'search': {
                      'code': userAttributes['custom:searchCode'],
                      'type': userAttributes['custom:searchType'],
                      'text': userAttributes['custom:searchText']
                    }
                  }
                });
              } catch (error) {
                console.log(error);
                yield put(loginFailure(translateSignInError("Une erreur est survenue lors de la création du brief, merci de réessayer plus tard")));
              }
            }
            // Final post /sessions to retrieve the required user infos immediately after signin (fired only the 1st time)
            userDynamo = yield API.post(config.apiGateway.NAME, '/sessions', {
              headers: {
                'x-api-key': config.apiKey
              },
              body: {
                email: userInfo.attributes.email
              }
            });
          }
        }
      };
    } catch (error) {
      console.log(error);
      yield put(getCurrentSessionFailure());
    }
    yield put(loginSuccess())
    yield put(getCurrentSessionLaunched({ fromPath: from || '/home' }));
  } catch (err) {
    console.log(err)
    if (err.code === 'UserNotConfirmedException') {
      yield Auth.resendSignUp(email)
      yield put(push('/confirm-signup', { email: email }));
      yield put(loginFailure(translateSignInError(err.code)));
    }
    yield put(loginFailure(translateSignInError(err.code)));
  }
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
  const prefixCode = getPhonePrefixCode(phonePrefix);

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
        'custom:searchText': searchValue,
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
  const { username, code } = action.payload;
  try {
    yield Auth.confirmSignUp(username, code);
    yield put(push('/login'));
    yield put(confirmSignupSuccess(translateConfirmSignUpSuccess()));
  } catch (error) {
    console.log(error);
    yield put(confirmSignupFailure(translateConfirmSignUpError(error.code)));
  }
}

function* doResendCode(action) {
  const email = action.payload;
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
  const { email } = action.payload;

  try {
    yield Auth.forgotPassword(email);
    yield put(requestPasswordCodeSuccess(translateResendCodeSuccess()));
  } catch (error) {
    yield put(requestPasswordCodeFailure(translateForgotPassword(error.code)));
  }
}

function* doSubmitNewPassword(action) {
  console.log(action);
  const { email, code, password } = action.payload;
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
