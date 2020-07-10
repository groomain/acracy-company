import Immutable from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  getMyProfileLoading: false,
  getMyProfileErrorMessage: null,
  myProfileData: null,
  //
  putMyProfileLoading: false,
  putMyProfileErrorMessage: null,
  //
  changePasswordLoading: false,
  changePasswordErrorMessage: null
});

const { actions, reducer } = createSlice({
  slice: 'MyProfileModification',
  name: 'MyProfileModification',
  initialState,
  reducers: {
    // GET MyProfile  /employees/{employeeId}
    getMyProfilePersonalInformationsLaunched: (state, action) => state
      .set('getMyProfileLoading', true)
      .set('getMyProfileErrorMessage', null),
    getMyProfilePersonalInformationsSuccess: (state, action) => state
      .set('getMyProfileLoading', false)
      .set('getMyProfileErrorMessage', null)
      .set('myProfileData', action.payload),
    getMyProfilePersonalInformationsFailure: (state, action) => state
      .set('getMyProfileLoading', false)
      .set('getMyProfileErrorMessage', action.payload),
    // PUT MyProfile  /employees/{employeeId}
    putMyProfilePersonalInformationsLaunched: (state, action) => state
      .set('putMyProfileLoading', true)
      .set('putMyProfileErrorMessage', null),
    putMyProfilePersonalInformationsSuccess: (state, action) => state
      .set('putMyProfileLoading', false)
      .set('putMyProfileErrorMessage', null),
    putMyProfilePersonalInformationsFailure: (state, action) => state
      .set('putMyProfileLoading', false)
      .set('putMyProfileErrorMessage', action.payload),
    // CHANGE password
    changePasswordLaunched: (state, action) => state
      .set('changePasswordLoading', true)
      .set('changePasswordErrorMessage', null),
    changePasswordSuccess: (state, action) => state
      .set('changePasswordLoading', false)
      .set('changePasswordErrorMessage', null),
    changePasswordFailure: (state, action) => state
      .set('changePasswordLoading', false)
      .set('changePasswordErrorMessage', action.payload)
  }
});

export const {
  getMyProfilePersonalInformationsLaunched,
  getMyProfilePersonalInformationsSuccess,
  getMyProfilePersonalInformationsFailure,
  //
  putMyProfilePersonalInformationsLaunched,
  putMyProfilePersonalInformationsSuccess,
  putMyProfilePersonalInformationsFailure,
  //
  changePasswordLaunched,
  changePasswordSuccess,
  changePasswordFailure
} = actions;

export default reducer;
