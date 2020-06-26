import Immutable from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  missionLoading: false,
  missionData: null,
  briefLoading: false,
  briefData: null,

});

const { actions, reducer } = createSlice({
  slice: 'Mission',
  name: 'Mission',
  initialState,
  reducers: {
    // GET Brief
    getBriefLaunched: (state, action) => state
        .set('briefLoading', true)
        .set('briefData', null),
    getBriefSuccess: (state, action) => state
        .set('briefLoading', false)
        .set('briefData', action.payload),
    getBriefFailure: (state, action) => state
        .set('briefLoading', false)
        .set('briefData', null),
    // GET Mission
    getMissionLaunched: (state, action) => state
      .set('missionLoading', true)
      .set('missionData', null),
    getMissionSuccess: (state, action) => state
      .set('missionLoading', false)
      .set('missionData', action.payload),
    getMissionFailure: (state, action) => state
      .set('missionLoading', false)
      .set('missionData', null),
  }
});

export const {
  getBriefLaunched,
  getBriefSuccess,
  getBriefFailure,
  getMissionLaunched,
  getMissionSuccess,
  getMissionFailure,
} = actions;

export default reducer;
