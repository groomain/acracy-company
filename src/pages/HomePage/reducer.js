import Immutable
  // , {fromJS} 
  from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  leadsData: null,
  leadsLoading: false,
  deletingLeadId: null,
  deletingLeadLoading: false,
  missionsLoading: false,
  missionsData: null,
  leadCreationStep: null
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
      .set('leadsData', null),
    deleteLeadLaunched: (state, action) => state
      .set('deletingLeadLoading', true)
      .set('deletingLeadId', null),
    deleteLeadSuccess: (state, action) => state
      .set('deletingLeadLoading', false)
      .set('deletingLeadId', action.payload),
    deleteLeadFailure: (state, action) => state
      .set('deletingLeadLoading', false)
      .set('deletingLeadId', null),
    getMissionsLaunched: (state, action) => state
      .set('missionsLoading', true)
      .set('missionsData', null),
    getMissionsSuccess: (state, action) => state
      .set('missionsLoading', false)
      .set('missionsData', action.payload.missions),
    getMissionsFailure: (state, action) => state
      .set('missionsLoading', false)
      .set('missionsData', null),
    setLeadCreationStep: (state, action) => state
      .set('leadCreationStep', action.payload)
  }
});

export const {
  getLeadsLaunched,
  getLeadsSuccess,
  getLeadsFailure,
  deleteLeadLaunched,
  deleteLeadSuccess,
  deleteLeadFailure,
  getMissionsLaunched,
  getMissionsSuccess,
  getMissionsFailure,
  setLeadCreationStep
} = actions;

export default reducer;
