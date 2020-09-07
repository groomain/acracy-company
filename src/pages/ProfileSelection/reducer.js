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
  validateCodeError: null,
  checkedProfilesStore: [],
  contactResponse: null,
  contactLoading: false,
  contactError: { code: 500, message: 'TEST ERROR' },
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
    getBriefSuccess: (state, action) => {
      // console.log("ACTION PAYLOAD", action.payload);
      return state
        .set('briefLoading', true)
        .set('briefData', action.payload.briefData)
        .set('quotesData', action.payload.quotesData.quotes)
    },
    getBriefFailure: (state, action) => state
      .set('briefLoading', false)
      .set('briefData', null)
      .set('briefError', action.payload),
    // VALIDATE PROFIL
    validateProfilesLaunched: (state, action) => state
      .set('validateLoading', true)
      .set('validateResponse', null),
    validateProfilesSuccess: (state, action) => state
      .set('validateLoading', false)
      .set('validateResponse', ''),
    validateProfilesFailure: (state, action) => state
      .set('validateResponse', null)
      .set('validateLoading', false)
      .set('validateError', action.payload.message)
      .set('validateCodeError', action.payload.code),
    setCheckedProfileStore: (state, action) => state
      .set('checkedProfilesStore', action.payload),
    // CONTACT ACRACY
    contactAcracyLaunched: (state, action) => state
      .set('contactLoading', true)
      .set('contactResponse', null),
    contactAcracySuccess: (state, action) => state
      .set('contactLoading', false)
      .set('contactResponse', action.payload),
    contactAcracyFailure: (state, action) => state
      .set('contactResponse', null)
      .set('contactLoading', false)
      .set('contactError', action.payload)
  }
});

export const {
  getBriefLaunched,
  getBriefSuccess,
  getBriefFailure,
  validateProfilesLaunched,
  validateProfilesSuccess,
  validateProfilesFailure,
  setCheckedProfileStore,
  contactAcracyLaunched,
  contactAcracySuccess,
  contactAcracyFailure
} = actions;

export default reducer;
