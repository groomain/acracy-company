import { all, put, takeLatest } from 'redux-saga/effects';
import { API, Auth } from 'aws-amplify';
import { config } from '../../conf/amplify';
import {
  getMyProfilePersonalInformationsSuccess,
  getMyProfilePersonalInformationsFailure,
  putMyProfilePersonalInformationsSuccess,
  putMyProfilePersonalInformationsFailure,
  changePasswordSuccess,
  changePasswordFailure
} from "./reducer";

function* doGetMyProfile(action) {
  console.log("function*doGetMyProfile -> action", action)
  const employeeId = action.payload;
  try {
    const myProfile = yield API.get(config.apiGateway.NAME, `/employees/${employeeId}`, {
      headers: {
        'x-api-key': config.apiKey
      }
    });
    yield put(getMyProfilePersonalInformationsSuccess(myProfile));
  } catch (error) {
    console.log(error);
    yield put(getMyProfilePersonalInformationsFailure());
  }
}

function* doPutMyProfile(action) {
  console.log("function*doPutMyProfile -> action", action)
  const { employeeId, firstName, lastName, email, phoneCode, phoneNumber, role } = action.payload;
  console.log(phoneCode.substring(phoneCode.indexOf('+'), phoneCode.length))
  try {
    const myProfile = yield API.put(config.apiGateway.NAME, `/employees/${employeeId}`, {
      headers: {
        'x-api-key': config.apiKey
      },
      body: {
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "phone": {
          "code": phoneCode.substring(phoneCode.indexOf('+'), phoneCode.length),
          "number": phoneNumber
        },
        "role": role
      }
    });
    yield put(putMyProfilePersonalInformationsSuccess(myProfile));
  } catch (error) {
    console.log(error);
    yield put(putMyProfilePersonalInformationsFailure());
  }
}

function* doChangePassword(action) {
  console.log("function*doChangePassword -> action", action)
  const { user, oldPassword, newPassword } = action.payload;
  try {
    yield Auth.changePassword({
      user: user,
      oldPassword: oldPassword,
      newPassword: newPassword
    });
    yield put(changePasswordSuccess());
  } catch (error) {
    console.log(error);
    yield put(changePasswordFailure());
  }
}

export default function* MyProfileModificationSaga() {
  yield all([
    takeLatest('MyProfileModification/getMyProfilePersonalInformationsLaunched', doGetMyProfile),
    takeLatest('MyProfileModification/putMyProfilePersonalInformationsLaunched', doPutMyProfile),
    takeLatest('MyProfileModification/changePasswordLaunched', doChangePassword)
  ]);
};