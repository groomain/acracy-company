import { all, put, takeLatest } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import { config } from '../../../conf/amplify';
import {
  uploadFileSuccess,
  uploadFileFailure,
  deleteAttachmentSuccess,
  deleteAttachmentFailure,
  getAttachmentsSuccess, getAttachmentsFailure
} from "./reducer";

import { openSnackBar } from "../../../components/App/reducer";
import {
  changeAttachmentFromData,
  openAdminSnackBar
} from "../../../pages/AdministrativePage/reducer";

function* doUploadFile(action) {
  const payload = action.payload.files[0];
  const type = action.payload.type;

  if (payload.file.size < 1.5e+7)
    try {
      const externalId = yield API.post(config.apiGateway.NAME, encodeURI('/attachments'),
        {
          headers: {
            'x-api-key': config.apiKey
          },
          body: {
            type: type,
            name: action.payload.name || payload.file.name,
            filename: payload.src,
            payload: {
              leadId: payload.leadId
            }
          }
        });
      if (action.payload.companyData) {
        const newCompanyData = {...action.payload.companyData, administrativeProfile: {...action.payload.companyData.administrativeProfile, legalDocuments: [...action.payload.companyData.administrativeProfile.legalDocuments, {externalId: externalId, name: action.payload.name}]}};
        yield put(changeAttachmentFromData(newCompanyData));
      }
      yield put(uploadFileSuccess());
    } catch (error) {
      yield put(uploadFileFailure());
      yield put(openSnackBar({ message: "Erreur pendant l'envoi du fichier", error: true }));
    } else {
    yield put(openSnackBar({ message: "Taille du fichier max. : 15Mo", error: true }));
  }

}

function* doDeleteAttachment(action) {
  const attachmentId = action.payload;

  try {
    yield API.del(config.apiGateway.NAME, encodeURI(`/attachments/${attachmentId}`),
      {
        headers: {
          'x-api-key': config.apiKey
        }
      });
    yield put(deleteAttachmentSuccess());
    yield put(openAdminSnackBar({ message: "Votre document a bien été supprimé", error: false }));
  } catch (error) {
    yield put(deleteAttachmentFailure());
    yield put(openAdminSnackBar({ message: "Une erreur est survenue", error: true }));
  }
}

function* doGetAttachments(action) {
  try {
    const attachments = yield API.get(config.apiGateway.NAME, `/attachments/${action.payload}`, {
      header: {
        'x-api-key': config.apiKey
      },
    });
    yield put(getAttachmentsSuccess(attachments))
    window.open(attachments);
  } catch (error) {
    yield put(getAttachmentsFailure())
    yield put(openAdminSnackBar({ message: "Une erreur est survenue", error: true }));
  }
}


export default function* UploadSaga() {
  yield all([
    takeLatest('Upload/uploadFileLaunched', doUploadFile),
    takeLatest('Upload/deleteAttachmentLaunched', doDeleteAttachment),
    takeLatest('Upload/getAttachmentsLaunched', doGetAttachments),
  ]);
}
