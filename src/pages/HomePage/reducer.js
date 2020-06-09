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
  leadCreationStep: null,
  briefsLoading: false,
  briefsData: null
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
      .set('leadCreationStep', action.payload),
    getBriefsLaunched: (state, action) => state
      .set('briefsLoading', true)
      .set('briefsData', null),
    getBriefsSuccess: (state, action) => state
      .set('briefsLoading', false)
      .set('briefsData', action.payload.briefs),
    getBriefsFailure: (state, action) => state
      .set('briefsLoading', false)
      .set('briefsData', null),
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
  setLeadCreationStep,
  getBriefsLaunched,
  getBriefsSuccess,
  getBriefsFailure,
} = actions;

export default reducer;
