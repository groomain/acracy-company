import Immutable
  // , {fromJS} 
  from 'immutable';
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
  confirmSignupLoading: false,
  confirmSignupErrorMessage: null,
  confirmSignupSuccessMessage: null,
  myprofileLoading: false,
  myprofileErrorMessage: null,
  confirmMyprofileLoading: false,
  confirmMyprofileErrorMessage: null,
  confirmMyprofileSuccessMessage: null,
  requestCodeLoading: false,
  requestCodeErrorMessage: null,
  submitPasswordLoading: false,
  submitPasswordErrorMessage: null,
  forgotPasswordStep: 1,
  updateUserLoading: false,
  updateUserErrorMessage: null,
  resendCodeLoading: false,
  resendCodeFailure: null,
  snackBarOpen: false,
  snackBarMessage: null,
  snackBarError: null
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
      .set('loginErrorMessage', action.payload)
      .set('confirmSignupSuccessMessage', null),
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
    // CONFIRM SIGNUP
    confirmSignupLaunched: (state, action) => state
      .set('confirmSignupLoading', true)
      .set('confirmSignupErrorMessage', null)
      .set('confirmSignupSuccessMessage', null),
    confirmSignupSuccess: (state, action) => state
      .set('confirmSignupLoading', false)
      .set('confirmSignupErrorMessage', null)
      .set('confirmSignupSuccessMessage', action.payload),
    confirmSignupFailure: (state, action) => state
      .set('confirmSignupLoading', false)
      .set('confirmSignupErrorMessage', action.payload)
      .set('confirmSignupSuccessMessage', null),
    // MYPROFILE
    myprofileLaunched: (state, action) => state
      .set('myprofileLoading', true)
      .set('myprofileErrorMessage', null),
    myprofileSuccess: (state, action) => state
      .set('myprofileLoading', false)
      .set('myprofileErrorMessage', null),
    myprofileFailure: (state, action) => state
      .set('myprofileLoading', false)
      .set('myprofileErrorMessage', action.payload),
    // CONFIRM MYPROFILE
    confirmMyprofileLaunched: (state, action) => state
      .set('confirmMyprofileLoading', true)
      .set('confirmMyprofileErrorMessage', null)
      .set('confirmMyprofileSuccessMessage', null),
    confirmMyprofileSuccess: (state, action) => state
      .set('confirmMyprofileLoading', false)
      .set('confirmMyprofileErrorMessage', null)
      .set('confirmMyprofileSuccessMessage', action.payload),
    confirmMyprofileFailure: (state, action) => state
      .set('confirmMyprofileLoading', false)
      .set('confirmMyprofileErrorMessage', action.payload)
      .set('confirmMyprofileSuccessMessage', null),
    // RESEND VERIFICATION CODE
    resendCodeLaunched: (state, action) => state
      .set('resendCodeLoading', true),
    resendCodeSuccess: (state, action) => state
      .set('resendCodeLoading', false)
      .set('resendCodeSuccessMessage', action.payload),
    resendCodeFailure: (state, action) => state
      .set('resendCodeLoading', false),
    // REQUEST PASSWORD CODE
    requestPasswordCodeLaunched: (state, action) => state
      .set('requestCodeLoading', true)
      .set('requestCodeErrorMessage', null),
    // .set('forgotPasswordStep', 1), // Commented out to fix a redirection error
    requestPasswordCodeSuccess: (state, action) => state
      .set('requestCodeLoading', false)
      .set('requestCodeErrorMessage', null)
      .set('resendCodeSuccessMessage', action.payload)
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
      .set('activeStep', action.payload - 1),
    // SnackBar
    openSnackBar: (state, action) => state
      .set('snackBarOpen', true)
      .set('snackBarMessage', action.payload.message)
      .set('snackBarError', action.payload.error),
    closeSnackBar: (state, action) => state
      .set('snackBarOpen', false),
    clearSnackBar: (state, action) => state
      .set('snackBarMessage', null)
      .set('snackBarError', null),
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
  confirmSignupLaunched,
  confirmSignupSuccess,
  confirmSignupFailure,
  myprofileLaunched,
  myprofileSuccess,
  myprofileFailure,
  confirmMyprofileLaunched,
  confirmMyprofileSuccess,
  confirmMyprofileFailure,
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
  handlePreviousStep,
  resendCodeLaunched,
  resendCodeSuccess,
  resendCodeFailure,
  openSnackBar,
  closeSnackBar,
  clearSnackBar
} = actions;

export default reducer;
