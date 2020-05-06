import Immutable, {fromJS} from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  activeStep: 0,
  isAuthenticated: false,
  isAuthenticating: false,
  userDynamo: null,
  loginLoading: false,
  loginErrorMessage: null,
  logoutLoading: false,
  signupLoading: false,
  signupErrorMessage: null,
  requestCodeLoading: false,
  requestCodeErrorMessage: null,
  submitPasswordLoading: false,
  submitPasswordErrorMessage: null,
  forgotPasswordStep: 1,
  updateUserLoading: false,
  updateUserErrorMessage: null

});

const { actions, reducer } = createSlice({
  slice: 'App',
  name: 'App',
  initialState,
  reducers: {
    // GETCURRENT
    getCurrentSessionLaunched: (state, action) => state
      .set('isAuthenticating', true)
      .set('isAuthenticated', false)
      .set('userInfo', null)
      .set('userDynamo', null),
    getCurrentSessionSuccess: (state, action) => state
      .set('isAuthenticated', true)
      .set('isAuthenticating', false)
      .set('userInfo', action.payload.userInfo)
      .set('userDynamo', action.payload.userDynamo),
    getCurrentSessionFailure: (state, action) => state
      .set('isAuthenticating', false)
      .set('isAuthenticated', false)
      .set('userInfo', null)
      .set('userDynamo', null),
    // LOGIN
    loginLaunched: (state, action) => state
      .set('loginLoading', true)
      .set('loginErrorMessage', null),
    loginSuccess: (state, action) => state
      .set('loginLoading', false)
      .set('loginErrorMessage', null),
    loginFailure: (state, action) => state
      .set('loginLoading', false)
      .set('loginErrorMessage', action.payload),
    // LOGOUT
    logoutLaunched: (state, action) => state
      .set('logoutLoading', true),
    logoutSuccess: (state, action) => initialState,
    logoutFailure: (state, action) => state
      .set('logoutLoading', false),
    // SIGNUP
    signupLaunched: (state, action) => state
      .set('signupLoading', true)
      .set('signupErrorMessage', null),
    signupSuccess: (state, action) => state
      .set('signupLoading', false)
      .set('signupErrorMessage', null),
    signupFailure: (state, action) => state
      .set('signupLoading', false)
      .set('signupErrorMessage', action.payload),
    // REQUEST PASSWORD CODE
    requestPasswordCodeLaunched: (state, action) => state
      .set('requestCodeLoading', true)
      .set('requestCodeErrorMessage', null)
      .set('forgotPasswordStep', 1),
    requestPasswordCodeSuccess: (state, action) => state
      .set('requestCodeLoading', false)
      .set('requestCodeErrorMessage', null)
      .set('forgotPasswordStep', 2),
    requestPasswordCodeFailure: (state, action) => state
      .set('requestCodeLoading', false)
      .set('requestCodeErrorMessage', action.payload)
      .set('forgotPasswordStep', 1),
    // SUBMIT NEW PASSWORD
    submitNewPasswordLaunched: (state, action) => state
      .set('submitPasswordLoading', true)
      .set('submitPasswordErrorMessage', null),
    submitNewPasswordSuccess: (state, action) => state
      .set('submitPasswordLoading', false)
      .set('submitPasswordErrorMessage', null),
    submitNewPasswordFaliure: (state, action) => state
      .set('submitPasswordLoading', false)
      .set('submitPasswordErrorMessage', action.payload),
    // FIRST LOGIN
    updateUserLaunched: (state, action) => state
      .set('updateUserLoading', true)
      .set('updateUserErrorMessage', null),
    updateUserSuccess: (state, action) => state
      .set('updateUserLoading', false)
      .set('updateUserErrorMessage', null),
    handleNextStep: (state, action) => state
      .set('activeStep', action.payload + 1),
    handlePreviousStep: (state, action) => state
      .set('activeStep', action.payload - 1 ),
  }
});

export const {
  getCurrentSessionLaunched,
  getCurrentSessionSuccess,
  getCurrentSessionFailure,
  loginLaunched,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  logoutLaunched,
  signupLaunched,
  signupSuccess,
  signupFailure,
  requestPasswordCodeLaunched,
  requestPasswordCodeSuccess,
  requestPasswordCodeFailure,
  submitNewPasswordLaunched,
  submitNewPasswordSuccess,
  submitNewPasswordFaliure,
  updateUserLaunched,
  updateUserSuccess,
  updateUserFailure,
  handleNextStep,
  handlePreviousStep
} = actions;

export default reducer;
