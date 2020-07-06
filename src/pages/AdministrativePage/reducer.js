import Immutable from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  companyLoading: false,
  companyData: null,
  companyError: null,
  companyUpdateLoading: false,
  companyUpdateError: null
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
    // PUT company
    putCompanyLaunched: (state, action) => state
      .set('companyUpdateLoading', true)
      .set('companyUpdateError', null)
      .set('companyData', null),
    putCompanySuccess: (state, action) => state
      .set('companyUpdateLoading', false)
      .set('companyData', action.payload),
    putCompanyFailure: (state, action) => state
      .set('companyUpdateLoading', false)
      .set('companyData', null)
      .set('companyUpdateError', action.payload),
  }
});

export const {
  getCompanyLaunched,
  getCompanySuccess,
  getCompanyFailure,
  putCompanyLaunched,
  putCompanySuccess,
  putCompanyFailure
} = actions;

export default reducer;
