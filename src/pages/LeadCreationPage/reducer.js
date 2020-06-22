import Immutable from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  leadSaveLoading: false,
  leadSaveErrorMessage: false,
  leadSaveData: null,
  leadDraftData: {
    search: null
  },
  deliverablesArray: [],
  dateFromCalendar: null,
  missionTitle: '',
  dailyRate: 0.0
});

const { actions, reducer } = createSlice({
  slice: 'LeadCreation',
  name: 'LeadCreation',
  initialState,
  reducers: {
    leadSaveLaunched: (state, action) => state
      .set('leadSaveLoading', true)
      .set('leadSaveErrorMessage', null),
    leadSaveSuccess: (state, action) => state
      .set('leadSaveLoading', false)
      .set('leadSaveData', action.payload)
      .set('leadSaveErrorMessage', null),
    leadSaveFailure: (state, action) => state
      .set('leadSaveLoading', false)
      .set('leadSaveErrorMessage', action.payload),
    setLeadDraft: (state, action) => state
      .set('leadDraftData', action.payload),
    setDeliverablesArray: (state, action) => state
      .set('deliverablesArray', action.payload),
    setDateFromCalendar: (state, action) => state
      .set('dateFromCalendar', action.payload),
    setMissionTitle: (state, action) => state
      .set('missionTitle', action.payload),
    setDailyRate: (state, action) => state
      .set('dailyRate', action.payload)
  }
});

export const {
  leadSaveLaunched,
  leadSaveSuccess,
  leadSaveFailure,
  setLeadDraft,
  setDeliverablesArray,
  setDateFromCalendar,
  setMissionTitle,
  setDailyRate
} = actions;

export default reducer;
