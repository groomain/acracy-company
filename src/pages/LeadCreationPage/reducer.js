import Immutable from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  leadSaveLoading: false,
  leadSaveErrorMessage: false,
  leadDraftId: null,
  leadCreationStep: 0,
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
  getExpertisesLoading: false,
  getExpertisesErrorMessage: null,
  expertises: [],
  //
  leadDraftSearchData: {
    search: null
  },
  deliverablesArray: [],
  dateFromCalendar: null,
  dailyRate: 0.0,
  //
  expansionPanelOpen: null,
  selectedExpertiseList: null,
  expertisePriorities: null,
  //
  sensitivities: [],
  sensitivitiesLoading: false,
  selectedSensitivity: null,
  sensitivityPriority: [],
  //
  selectedLanguage: null,
  languagePriority: [],
  //
  uploadFileLoading: false,
  leadAttachmentId: null,
  deleteFileLoading: false,
  uploadedFileName: null
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
      .set('leadDraftId', action.payload.leadId) // leadId
      .set('leadSaveErrorMessage', null)
      .set('leadCreationStep', 1),
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
      .set('leadDraftData', null)
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
      .set('dailyRate', action.payload),
    // get expertises
    getExpertisesLaunched: (state, action) => state
      .set('getExpertisesLoading', true)
      .set('getExpertisesErrorMessage', null),
    getExpertisesSuccess: (state, action) => state
      .set('getExpertisesLoading', false)
      .set('getExpertisesErrorMessage', null)
      .set('expertises', action.payload.expertises),
    getExpertisesFailure: (state, action) => state
      .set('getExpertisesLoading', false)
      .set('expertises', null)
      .set('getExpertisesErrorMessage', action.payload),
    // expansion pannel state for lead creation step 2
    setExpansionPanelOpen: (state, action) => state
      .set('expansionPanelOpen', action.payload),
    // Expertise
    setSelectedExpertise: (state, action) => state
      .set('selectedExpertiseList', action.payload),
    setExpertisePriorities: (state, action) => state
      .set('expertisePriorities', action.payload),
    // Sensitivity
    getSensitivitiesLaunched: (state, action) => state
      .set('sensitivitiesLoading', true),
    getSensitivitiesSuccess: (state, action) => state
      .set('sensitivities', action.payload.sensitivities)
      .set('sensitivitiesLoading', false),
    getSensitivitiesFailure: (state, action) => state
      .set('sensitivities', null)
      .set('sensitivitiesLoading', false),
    setSelectedSensitivity: (state, action) => state
      .set('selectedSensitivity', action.payload),
    setSensitivityPriority: (state, action) => state
      .set('sensitivityPriority', action.payload),
    // Languages
    setSelectedLanguage: (state, action) => state
      .set('selectedLanguage', action.payload),
    setLanguagePriority: (state, action) => state
      .set('languagePriority', action.payload),
    // File upload
    uploadFileLaunched: (state, action) => state
      .set('uploadFileLoading', true),
    uploadFileSuccess: (state, action) => state
      .set('uploadFileLoading', false)
      .set('leadAttachmentId', action.payload),
    uploadFileFailure: (state, action) => state
      .set('uploadFileLoading', false)
      .set('leadAttachmentId', null),
    uploadedFileName: (state, action) => state
      .set('uploadedFileName', action.payload),
    // Delete Uploaded File
    deleteAttachmentLaunched: (state, action) => state
      .set('deleteFileLoading', true),
    deleteAttachmentSuccess: (state, action) => state
      .set('deleteFileLoading', false),
    deleteAttachmentFailure: (state, action) => state
      .set('deleteFileLoading', false),
    // Misc
    dispatchLeadId: (state, action) => state
      .set('leadDraftId', action.payload)
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
  setExpansionPanelOpen,
  setSelectedExpertise,
  setExpertisePriorities,
  getExpertisesLaunched,
  getExpertisesSuccess,
  getExpertisesFailure,
  //
  getSensitivitiesLaunched,
  getSensitivitiesSuccess,
  getSensitivitiesFailure,
  setSelectedSensitivity,
  setSensitivityPriority,
  //
  setSelectedLanguage,
  setLanguagePriority,
  //
  uploadFileLaunched,
  uploadFileSuccess,
  uploadFileFailure,
  uploadedFileName,
  //
  deleteAttachmentLaunched,
  deleteAttachmentSuccess,
  deleteAttachmentFailure,
  //
  dispatchLeadId
} = actions;

export default reducer;
