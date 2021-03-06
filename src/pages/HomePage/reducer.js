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
  leadCreationStep: 0,
  briefsLoading: false,
  briefsData: null,
  quotes: null,
  quotesLoading: false,
  companiesData: null,
  companiesLoading: false,
  companiesDataFetched: false,
  comingFromDashboard: false,
  updateMissionLoading: false,
  updateMissionSent: false,
  leadCreationPageWithSearchResult: null,
  sendMessageLoading: false,
  sendMessageSuccess: '',
  refusalSnackBarOpen: false,
  refusalSnackBarMessage: '',
  refusalSnackBarError: false
});

const { actions, reducer } = createSlice({
  slice: 'Leads',
  name: 'Leads',
  initialState,
  reducers: {
    // Drafts section (carousel)
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
    setLeadCreationStep: (state, action) => state
      .set('leadCreationStep', action.payload),

    // Every mission except the "matching profile" section
    getMissionsLaunched: (state, action) => state
      .set('missionsLoading', true)
      .set('missionsData', null),
    getMissionsSuccess: (state, action) => state
      .set('missionsLoading', false)
      .set('missionsData', action.payload),
    getMissionsFailure: (state, action) => state
      .set('missionsLoading', false)
      .set('missionsData', null),

    // The "matching profile" section
    getBriefsLaunched: (state, action) => state
      .set('briefsLoading', true)
      .set('briefsData', null),
    getBriefsSuccess: (state, action) => state
      .set('briefsLoading', false)
      .set('briefsData', action.payload),
    getBriefsFailure: (state, action) => state
      .set('briefsLoading', false)
      .set('briefsData', null),
    getQuotesLaunched: (state, action) => state
      .set('quotesLoading', true)
      .set('quotes', null),
    getQuotesSuccess: (state, action) => state
      .set('quotes', [action.payload.quotes])
      .set('quotesLoading', false),
    getQuotesFailure: (state, action) => state
      .set('quotes', null)
      .set('quotesLoading', false),

    // Companies infos for before redirection
    getCompaniesLaunched: (state, action) => state
      .set('companiesData', null)
      .set('companiesLoading', true),
    getCompaniesSuccess: (state, action) => state
      .set('companiesData', action.payload)
      .set('companiesDataFetched', true)
      .set('companiesLoading', false),
    getCompaniesFailure: (state, action) => state
      .set('companiesData', null)
      .set('companiesDataFetched', false)
      .set('companiesLoading', false),
    setComingFromDashboard: (state, action) => state
      .set('comingFromDashboard', action.payload),

    // Send Incident Message
    sendIncidentMessageLaunched: (state, action) => state
      .set('sendMessageLoading', true),
    sendIncidentMessageSuccess: (state, action) => state
      .set('sendMessageLoading', false),
    sendIncidentMessageFailure: (state, action) => state
      .set('sendMessageLoading', false),

    // Update Mission
    updateMissionLaunched: (state, action) => state
      .set('updateMissionLoading', true),
    updateMissionSuccess: (state, action) => state
      .set('updateMissionLoading', false)
      .set('updateMissionSent', true),
    updateMissionFailure: (state, action) => state
      .set('updateMissionLoading', false),

    // From dashboard to lead creation with search result
    pushToLeadCreationPageWithSearchResult: (state, action) => state
      .set('leadCreationPageWithSearchResult', action.payload),

    // Send refusal message
    sendRefusalMessageLaunched: (state, action) => state
      .set('sendMessageLoading', true),
    sendRefusalMessageSuccess: (state, action) => state
      .set('sendMessageLoading', false)
      .set('sendMessageSuccess', action.payload),
    sendRefusalMessageFailure: (state, action) => state
      .set('sendMessageLoading', false),

    // Refusal SnackBar
    openRefusalSnackBar: (state, action) => state
      .set('refusalSnackBarOpen', true)
      .set('refusalSnackBarMessage', action.payload.message)
      .set('refusalSnackBarError', action.payload.error),
    closeRefusalSnackBar: (state, action) => state
      .set('refusalSnackBarOpen', false),
    clearRefusalSnackBar: (state, action) => state
      .set('refusalSnackBarMessage', null)
      .set('refusalSnackBarError', null)
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
  getQuotesLaunched,
  getQuotesSuccess,
  getQuotesFailure,
  getCompaniesLaunched,
  getCompaniesSuccess,
  getCompaniesFailure,
  setComingFromDashboard,
  sendIncidentMessageLaunched,
  sendIncidentMessageSuccess,
  sendIncidentMessageFailure,
  updateMissionLaunched,
  updateMissionSuccess,
  updateMissionFailure,
  pushToLeadCreationPageWithSearchResult,
  sendRefusalMessageLaunched,
  sendRefusalMessageSuccess,
  sendRefusalMessageFailure,
  openRefusalSnackBar,
  closeRefusalSnackBar,
  clearRefusalSnackBar
} = actions;

export default reducer;
