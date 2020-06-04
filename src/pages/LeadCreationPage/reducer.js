import Immutable from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  leadSaveLoading: false,
  leadSaveErrorMessage: false,
});

const { actions, reducer } = createSlice({
  slice: 'leadCreation',
  name: 'leadCreation',
  initialState,
  reducers: {
    leadSaveLaunched: (state, action) => state
      .set('leadSaveLoading', true)
      .set('leadSaveErrorMessage', null),
    leadSaveSuccess: (state, action) => state
      .set('leadSaveLoading', false)
      .set('leadSaveErrorMessage', null),
    leadSaveFailure: (state, action) => state
      .set('leadSaveLoading', false)
      .set('leadSaveErrorMessage', action.payload),
  }
});

export const {
  leadSaveLaunched,
  leadSaveSuccess,
  leadSaveFailure,
} = actions;

export default reducer;
