import {
  all, put, takeLatest, delay
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
  updateUserSuccess, closeSnackBar, clearSnackBar, openSnackBar,
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

import { handleCurrentStep } from "../App/reducer";
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
        if (userDynamo?.companyId && userDynamo?.employeeId) {
          yield put(loginSuccess())
          yield put(getCurrentSessionLaunched({ fromPath: from || '/home' })); // Redirection when everything is ok
        } else {
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
              yield put(openSnackBar({ message: translateSignInError(error.code), error: true }));
            }
          }
          // Create the related employee
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
              yield put(openSnackBar({ message: translateSignInError(error.code), error: true }));
            }
          }
          // Start the lead creation if the 2 previous steps are ok & search content is present
          if (userDynamo?.companyId && userDynamo?.employeeId) {
            const userAttributes = userInfo?.attributes;
            let errorLeadMessage;
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
                errorLeadMessage = translateSignInError("leadCreationError"); // Create the error message to be passed to the loginSuccess method
              }
            }
            yield put(loginSuccess(errorLeadMessage));
            yield put(openSnackBar({ message: errorLeadMessage, error: false }));
            yield put(getCurrentSessionLaunched({ fromPath: from || '/home' })); // Redirection with or without lead creation error message
          } else {
            yield put(loginFailure(translateSignInError("")));
            yield put(openSnackBar({ message: translateSignInError(""), error: true }));
          }
        }
      }
    } catch (error) {
      console.log(error);
      yield put(getCurrentSessionFailure());
    }
  } catch (err) {
    console.log(err)
    if (err.code === 'UserNotConfirmedException') {
      yield Auth.resendSignUp(email)
      yield put(push('/confirm-signup', { email: email }));
      yield put(loginFailure(translateSignInError(err.code)));
      yield put(openSnackBar({ message: translateSignInError(err.code), error: true }));
    }
    yield put(loginFailure(translateSignInError(err.code)));
    yield put(openSnackBar({ message: translateSignInError(err.code), error: true }));
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
    // yield call(doSignIn, { payload: { email, password } });
    yield put(handleCurrentStep(3));
    yield put(signupSuccess());
    yield put(push('/confirmAccount', { email: email }));
    yield put(handleCurrentStep(0));
  } catch (error) {
    console.log(error);
    yield put(signupFailure(translateSignUpError(error.code)));
    yield put(openSnackBar({ message: translateSignUpError(error.code), error: true }));

  }
}

function* doConfirmSignUp(action) {
  const { username, code } = action.payload;
  try {
    yield Auth.confirmSignUp(username, code);
    yield put(push('/login'));
    yield put(confirmSignupSuccess(translateConfirmSignUpSuccess()));
    yield put(openSnackBar({ message: translateConfirmSignUpSuccess(), error: false }));
  } catch (error) {
    console.log(error);
    yield put(confirmSignupFailure(translateConfirmSignUpError(error.code)));
    yield put(openSnackBar({ message: translateConfirmSignUpError(error.code), error: true }));
  }
}

function* doResendCode(action) {
  const email = action.payload;
  try {
    yield Auth.resendSignUp(email);
    yield put(resendCodeSuccess(translateResendCodeSuccess()));
    yield put(openSnackBar({ message: translateResendCodeSuccess(), error: false }));
  } catch (error) {
    console.log(error);
    yield put(resendCodeFailure(translateResendCodeError(error.code)));
    yield put(openSnackBar({ message: translateResendCodeError(error.code), error: true }));
  }
}

function* doRequestPasswordCode(action) {
  // console.log(action);
  const { email } = action.payload;

  try {
    yield Auth.forgotPassword(email);
    yield put(requestPasswordCodeSuccess(translateResendCodeSuccess()));
    yield put(openSnackBar({ message: translateResendCodeSuccess(), error: false }));
  } catch (error) {
    yield put(requestPasswordCodeFailure(translateForgotPassword(error.code)));
    yield put(openSnackBar({ message: translateForgotPassword(error.code), error: true }));
  }
}

function* doSubmitNewPassword(action) {
  // console.log(action);
  const { email, code, password } = action.payload;
  try {
    yield Auth.forgotPasswordSubmit(email, code, password);
    yield put(submitNewPasswordSuccess());
    yield put(openSnackBar({ message: submitNewPasswordSuccess(), error: false }));
    yield put(push('/home'));
  } catch (error) {
    yield put(submitNewPasswordFaliure(translateConfirmForgotPassword(error.code)));
    yield put(openSnackBar({ message: translateConfirmForgotPassword(error.code), error: true }));
  }
}

function* doUpdateUser(action) {
  // console.log(action);
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

function* setSnackBar() {
  yield delay(5000);
  yield put(closeSnackBar());
  yield delay(200);
  yield put(clearSnackBar());
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
    takeLatest('App/openSnackBar', setSnackBar),
    takeLatest('App/updateUserLaunched', doUpdateUser),
    takeLatest('App/confirmSignupLaunched', doConfirmSignUp),
    takeLatest('App/resendCodeLaunched', doResendCode)
  ]);
}
