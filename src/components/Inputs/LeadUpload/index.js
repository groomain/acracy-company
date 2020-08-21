import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import DarkWrapper from '../../Layout/DarkWrapper';
import fileIcon from '../../../assets/icons/file-icon.svg';
import uploadFileIcon from '../../../assets/icons/upload-file.svg';
import { CloseIcon } from '../../../assets/icons/CloseIcon';
import { Grid, Typography, Box } from '@material-ui/core';
import styles from './styles';
import { uploadFileLaunched, deleteAttachmentLaunched, uploadedFileName } from '../../../pages/LeadCreationPage/reducer';
import { getAttachmentsLaunched } from "../Upload/reducer";

const UploadInput = (props) => {
  const classes = styles();

  return (
    <div className={classes.uploadContainer}>
      <img src={uploadFileIcon} alt="upload button" />
      <input
        type="file"
        name="img-loader-input"
        // multiple
        className={classes.invisible}
        {...props}
      />
    </div >
  )
}

export const LeadUpload = () => {
  const classes = styles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { leadAttachmentId, leadDraftId, leadDraftData } = useSelector(state => ({
    leadAttachmentId: state.getIn(['leadCreation', 'leadAttachmentId']),
    leadDraftId: state.getIn(['leadCreation', 'leadDraftId']),
    leadDraftData: state.getIn(['leadCreation', 'leadDraftData']),
  }));

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [hoveredClose, setHoveredClose] = React.useState(false);

  useEffect(() => {
    if (leadDraftData?.missionDetail?.sharedDocuments?.length > 0 && leadDraftData?.missionDetail?.sharedDocuments[0]?.externalId) {
      setUploadedFiles(leadDraftData?.missionDetail?.sharedDocuments);
    }
  }, [leadDraftData])

  const handleChange = (e) => {
    const fileList = e.target.files;
    const arrFiles = Array.from(fileList);

    if (fileList.length) {
      const files = arrFiles.map((file, index) => {
        const src = window.URL.createObjectURL(file)
        return { file, id: index, src, leadId: leadDraftId }
      })
      setUploadedFiles(files);
      dispatch(uploadFileLaunched(files))
      dispatch(uploadedFileName(files[0].file.name))
    }

    if (fileList[0].size > 1.5e+7) {
      setFileSizeError(true)
    } else {
      setFileSizeError(false)
    }
  }

  const handleFileDelete = () => {
    setUploadedFiles([]);
    dispatch(deleteAttachmentLaunched(leadAttachmentId || leadDraftData?.missionDetail?.sharedDocuments[0].externalId))
  };

  return (
    <>
      <Box my={3}>
        <Typography variant="h1">{t('upload.title.single')}</Typography>
      </Box>
      <Box my={2}>
        <Typography variant="body1">{t('upload.subtitle')}</Typography>
      </Box>
      <DarkWrapper justify='center' alignItems='center'>
        <form className="form">
          <Grid container>
            {uploadedFiles?.map((file, index) => {
              return (
                <Box mx={2} key={`file-row${index}`}>
                  <Grid container direction="column" alignItems="center">
                    <div style={{ position: 'relative' }}>
                      <img src={fileIcon} alt="uploaded file" onClick={() => dispatch(getAttachmentsLaunched(leadAttachmentId || uploadedFiles[0].externalId))} className={classes.img} />
                      <CloseIcon
                        hovered={hoveredClose}
                        onMouseEnter={() => setHoveredClose(true)}
                        onMouseLeave={() => setHoveredClose(false)}
                        className={classes.closeButton}
                        onClick={handleFileDelete}
                      />
                    </div>
                    <Box my={1}>
                      <Typography className={fileSizeError ? classes.maxedFileSize : null}>{file?.name || file?.file?.name}</Typography>
                    </Box>
                  </Grid>
                </Box>
              )
            })}
            {uploadedFiles?.length < 1 && (
              <Grid container direction="column" alignItems="center" className={classes.uploadIconWrapper}>
                <UploadInput onChange={handleChange} />
                <Box my={1}>
                  {t('upload.addDocument')}
                </Box>
              </Grid>
            )}
          </Grid>
        </form>
      </DarkWrapper>
      <Box my={2}>
        <Typography variant="body1" color="primary">{t('upload.confidentialityText')}</Typography>
      </Box>
    </>
  )
};

export default LeadUpload;
