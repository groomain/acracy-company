import Immutable
  // , {fromJS} 
  from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  briefData: null,
  quotesData: null,
  briefLoading: false,
  briefError: null,
  validateResponse: null,
  validateLoading: false,
  validateError: null,
  validateCodeError: null
});

const { actions, reducer } = createSlice({
  slice: 'SelectionProfil',
  name: 'SelectionProfil',
  initialState,
  reducers: {
    // GET SELECTION PROFIL
    getBriefLaunched: (state, action) => state
      .set('briefLoading', true)
      .set('briefData', null),
    getBriefSuccess: (state, action) => state
      .set('briefLoading', true)
      .set('briefData', action.payload.briefData)
      .set('briefData', action.payload.briefData),
    getBriefFailure: (state, action) => state
      .set('briefLoading', false)
      .set('briefData', null)
      .set('briefError', action.payload),
    // VALIDATE PROFIL
    validateProfilesLaunched: (state, action) => state
      .set('validateLoading', true)
      .set('validateResponse', null),
    validateProfilesSuccess: (state, action) => state
      .set('validateLoading', true)
      .set('validateResponse', action.payload),
    validateProfilesFailure: (state, action) => state
      .set('validateResponse', null)
      .set('validateLoading', false)
      .set('validateError', action.payload.message)
      .set('validateCodeError', action.payload.code)

  }
});

export const {
  getBriefLaunched,
  getBriefSuccess,
  getBriefFailure,
  validateProfilesLaunched,
  validateProfilesSuccess,
  validateProfilesFailure
} = actions;

export default reducer;
