import Immutable
  // , {fromJS} 
  from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  selectionProfilData: null,
  selectionProfilLoading: false,
  selectionProfilError: null,
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
    // GET CURRENT
    getSelectionProfilLaunched: (state, action) => state
      .set('selectionProfilLoading', true)
      .set('selectionProfilData', null),
    getSelectionProfilSuccess: (state, action) => state
      .set('selectionProfilLoading', true)
      .set('selectionProfilData', action.payload),
    getSelectionProfilFailure: (state, action) => state
      .set('selectionProfilLoading', false)
      .set('selectionProfilData', null)
      .set('selectionProfilError', action.payload),
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
  getSelectionProfilLaunched,
  getSelectionProfilSuccess,
  getSelectionProfilFailure,
  validateProfilesLaunched,
  validateProfilesSuccess,
  validateProfilesFailure
} = actions;

export default reducer;
