import Immutable from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  contactResponse: null,
  contactLoading: false,
  contactError: {code: 500, message: 'TEST ERROR'},
});

const { actions, reducer } = createSlice({
  slice: 'Contact',
  name: 'Contact',
  initialState,
  reducers: {
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
  contactAcracyLaunched,
  contactAcracySuccess,
  contactAcracyFailure
} = actions;

export default reducer;
