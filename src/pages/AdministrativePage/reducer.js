import Immutable from 'immutable';
import { createSlice } from "@reduxjs/toolkit";
import { FormatListBulleted } from '@material-ui/icons';

const initialState = Immutable.Map({
  companyLoading: false,
  companyData: null,
  companyError: null,
  companyUpdateLoading: false,
  companyUpdateError: null,
  compnayUpdateResponse: null,
  getAttachmentsLoading: false,
  getAttachmentsError: false,
  attachments: [],
  uploadAttachmentLoading: false,
  uploadAttachmentError: null,
  uploadResponse: null,
  deleteAttachmentLoading: false,
  deleteAttachmentError: null,
  deleteResponse: null,
});

const { actions, reducer } = createSlice({
  slice: 'Administrative',
  name: 'Administrative',
  initialState,
  reducers: {
    // GET company
    getCompanyLaunched: (state, action) => state
      .set('companyLoading', true)
      .set('companyError', null)
      .set('companyData', null),
    getCompanySuccess: (state, action) => state
      .set('companyLoading', false)
      .set('companyData', action.payload),
    getCompanyFailure: (state, action) => state
      .set('companyLoading', false)
      .set('companyData', null)
      .set('companyError', action.payload),
    // PUT company
    putCompanyLaunched: (state, action) => state
      .set('companyUpdateLoading', true)
      .set('companyUpdateError', null)
      .set('compnayUpdateResponse', null),
    putCompanySuccess: (state, action) => state
      .set('companyUpdateLoading', false)
      .set('compnayUpdateResponse', action.payload),
    putCompanyFailure: (state, action) => state
      .set('companyUpdateLoading', false)
      .set('compnayUpdateResponse', null)
      .set('companyUpdateError', action.payload),
    // GET attachments
    getAttachmentsLaunched: (state, action) => state
      .set('getAttachmentsLoading', true)
      .set('getAttachmentsError', null)
      .set('attachments', null),
    getAttachmentsSuccess: (state, action) => state
      .set('getAttachmentsLoading', false)
      .set('attachments', action.payload),
    getAttachmentsFailure: (state, action) => state
      .set('getAttachmentsLoading', false)
      .set('attachments', null)
      .set('getAttachmentsError', action.payload),
    // POST attachment
    uploadAttachmentLaunched: (state, action) => state
      .set('uploadAttachmentLoading', true)
      .set('uploadAttachmentError', null)
      .set('uploadResponse', null),
    uploadAttachmentSuccess: (state, action) => state
      .set('uploadAttachmentLoading', false)
      .set('uploadResponse', action.payload),
    uploadAttachmentFailure: (state, action) => state
      .set('uploadAttachmentLoading', false)
      .set('uploadResponse', null)
      .set('uploadAttachmentError', action.payload),
    // DELETE attachment
    deleteAttachmentLaunched: (state, action) => state
      .set('deleteAttachmentLoading', true)
      .set('deleteAttachmentError', null)
      .set('deleteResponse', null),
    deleteAttachmentSuccess: (state, action) => state
      .set('deleteAttachmentLoading', false)
      .set('deleteResponse', action.payload),
    deleteAttachmentFailure: (state, action) => state
      .set('deleteAttachmentLoading', false)
      .set('deleteResponse', null)
      .set('deleteAttachmentError', action.payload),

  }
});

export const {
  getCompanyLaunched,
  getCompanySuccess,
  getCompanyFailure,
  putCompanyLaunched,
  putCompanySuccess,
  putCompanyFailure,
  //////
  getAttachmentsLaunched,
  getAttachmentsSuccess,
  getAttachmentsFailure,
  uploadAttachmentLaunched,
  uploadAttachmentSuccess,
  uploadAttachmentFailure,
  deleteAttachmentLaunched,
  deleteAttachmentSuccess,
  deleteAttachmentFailure
} = actions;

export default reducer;
