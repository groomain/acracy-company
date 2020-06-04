import Immutable
  // , {fromJS} 
  from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  leadsData: null,
  leadsLoading: false
});

const { actions, reducer } = createSlice({
  slice: 'Leads',
  name: 'Leads',
  initialState,
  reducers: {
    getLeadsLaunched: (state, action) => state
      .set('leadsLoading', true)
      .set('leadsData', null),
    getLeadsSuccess: (state, action) => state
      .set('leadsLoading', false)
      .set('leadsData', action.payload.leads),
    getLeadsFailure: (state, action) => state
      .set('leadsLoading', false)
      .set('leadsData', null)
  }
});

export const {
  getLeadsLaunched,
  getLeadsSuccess,
  getLeadsFailure
} = actions;

export default reducer;
