import { all, put, takeLatest } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import { config } from '../../../conf/amplify';
import {
  uploadFileSuccess,
  uploadFileFailure,
  deleteAttachmentSuccess,
  deleteAttachmentFailure,
  getAttachmentsSuccess, getAttachmentsFailure
} from './reducer';

import { openSnackBar } from '../../../components/App/reducer';
import {
  openAdminSnackBar
} from '../../../pages/AdministrativePage/reducer';
import { s3Upload } from '../../../utils/services/awsLib';
import { getCompany } from '../../../pages/AdministrativePage/sagas';

function* doUploadFile(action) {
  const payload = action.payload.files[0];
  const {type} = action.payload;

  if (payload.file.size < 1.5e+7) {
    try {
      const storedKey = yield s3Upload(`${action.payload.companyData.externalId}-${action.payload.name}`, payload.file);
      yield API.post(config.apiGateway.NAME, encodeURI('/attachments'),
        {
          headers: {
            'x-api-key': config.apiKey
          },
          body: {
            type,
            name: action.payload.name || payload.file.name,
            filename: storedKey,
            payload: {
              companyId: action.payload.companyData.externalId
            }
          }
        });
      yield getCompany({payload: action.payload.companyData.externalId});

      yield put(uploadFileSuccess());
      yield put(openAdminSnackBar({ message: "Votre document a bien été ajouté", error: false }));
    } catch (error) {
      yield put(uploadFileFailure());
      yield put(openSnackBar({ message: "Erreur pendant l'envoi du fichier", error: true }));
    }
  } else {
    yield put(openSnackBar({ message: "Taille du fichier max. : 15Mo", error: true }));
  }

}

function* doDeleteAttachment(action) {
  try {
    yield API.del(config.apiGateway.NAME, encodeURI(`/attachments/${action.payload}`),
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
      headers: {
        'x-api-key': config.apiKey
      },
    });
    yield put(getAttachmentsSuccess(attachments));
    window.open(attachments.url);
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
