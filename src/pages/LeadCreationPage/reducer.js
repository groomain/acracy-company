import Immutable from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  leadSaveLoading: false,
  leadSaveErrorMessage: false,
  leadDraftId: null,
  //
  getLeadDraftLoading: false,
  getLeadDraftErrorMessage: null,
  leadDraftData: null,
  //
  updateLeadDraftLoading: false,
  updateLeadDraftErrorMessage: null,
  updateResponse: null,
  //
  changeLeadStatusLoading: false,
  changeLeadStatusErrorMessage: null,
  changeResponse: null,
  //
  leadDraftSearchData: {
    search: null
  },
  deliverablesArray: [],
  dateFromCalendar: null,
  dailyRate: 0.0
});

const { actions, reducer } = createSlice({
  slice: 'LeadCreation',
  name: 'LeadCreation',
  initialState,
  reducers: {
    // POST  /leads
    leadSaveLaunched: (state, action) => state
      .set('leadSaveLoading', true)
      .set('leadSaveErrorMessage', null),
    leadSaveSuccess: (state, action) => state
      .set('leadSaveLoading', false)
      .set('leadDraftId', action.payload) // leadId
      .set('leadSaveErrorMessage', null),
    leadSaveFailure: (state, action) => state
      .set('leadSaveLoading', false)
      .set('leadSaveErrorMessage', action.payload),
    // GET Draft  /leads/{leadId}
    getLeadDraftLaunched: (state, action) => state
      .set('getLeadDraftLoading', true)
      .set('getLeadDraftErrorMessage', null),
    getLeadDraftSuccess: (state, action) => state
      .set('getLeadDraftLoading', false)
      .set('getLeadDraftErrorMessage', null)
      .set('leadDraftData', action.payload),
    getLeadDraftFailure: (state, action) => state
      .set('getLeadDraftLoading', false)
      .set('getLeadDraftErrorMessage', action.payload),
    // PUT Draft  /leads/{leadId}
    putLeadDraftLaunched: (state, action) => state
      .set('updateLeadDraftLoading', true)
      .set('updateLeadDraftErrorMessage', null),
    putLeadDraftSuccess: (state, action) => state
      .set('updateLeadDraftLoading', false)
      .set('updateLeadDraftErrorMessage', null)
      .set('updateResponse', action.payload),
    putLeadDraftFailure: (state, action) => state
      .set('updateLeadDraftLoading', false)
      .set('updateLeadDraftErrorMessage', action.payload),
    // POST status  /leads/{leadId}/actions
    changeLeadStatusLaunched: (state, action) => state
      .set('changeLeadStatusLoading', true)
      .set('changeLeadStatusErrorMessage', null),
    changeLeadStatusSuccess: (state, action) => state
      .set('changeLeadStatusLoading', false)
      .set('changeLeadStatusErrorMessage', null)
      .set('changeResponse', action.payload),
    changeLeadStatusFailure: (state, action) => state
      .set('changeLeadStatusLoading', false)
      .set('changeLeadStatusErrorMessage', action.payload),
    // set separate infos from lead creation form
    setLeadDraftSearchData: (state, action) => state
      .set('leadDraftSearchData', action.payload),
    setDeliverablesArray: (state, action) => state
      .set('deliverablesArray', action.payload),
    setDateFromCalendar: (state, action) => state
      .set('dateFromCalendar', action.payload),
    setDailyRate: (state, action) => state
      .set('dailyRate', action.payload)
  }
});

export const {
  leadSaveLaunched,
  leadSaveSuccess,
  leadSaveFailure,
  //
  getLeadDraftLaunched,
  getLeadDraftSuccess,
  getLeadDraftFailure,
  //
  putLeadDraftLaunched,
  putLeadDraftSuccess,
  putLeadDraftFailure,
  //
  changeLeadStatusLaunched,
  changeLeadStatusSuccess,
  changeLeadStatusFailure,
  //
  setDailyRate,
  setLeadDraftSearchData,
  setDeliverablesArray,
  setDateFromCalendar,

} = actions;

export default reducer;
