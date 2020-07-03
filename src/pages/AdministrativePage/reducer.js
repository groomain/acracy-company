import Immutable from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  companyLoading: false,
  companyData: null,
  companyError: null
});

const { actions, reducer } = createSlice({
  slice: 'Administrative',
  name: 'Administrative',
  initialState,
  reducers: {
    // GET company
    getCompanyLaunched: (state, action) => state
        .set('companyLoading', true)
        .set('companyError', null)
        .set('companyData', null),
    getCompanySuccess: (state, action) => state
        .set('companyLoading', false)
        .set('companyData', action.payload),
    getCompanyFailure: (state, action) => state
        .set('companyLoading', false)
        .set('companyData', null)
        .set('companyError', action.payload),
  }
});

export const {
  getCompanyLaunched,
  getCompanySuccess,
  getCompanyFailure,
} = actions;

export default reducer;
