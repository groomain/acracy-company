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
  dateFromCalendar: null
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
      .set('dateFromCalendar', action.payload)
  }
});

export const {
  leadSaveLaunched,
  leadSaveSuccess,
  leadSaveFailure,
  setLeadDraft,
  setDeliverablesArray,
  setDateFromCalendar
} = actions;

export default reducer;
