import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import DarkWrapper from '../../Layout/DarkWrapper';
import fileIcon from '../../../assets/icons/file-icon.svg';
import uploadFileIcon from '../../../assets/icons/upload-file.svg';
import { CloseIcon } from '../../../assets/icons/CloseIcon';
import { Grid, Typography, Box, IconButton } from '@material-ui/core';
import styles from './styles';
import { uploadFileLaunched, deleteAttachmentLaunched, uploadedFileName } from '../../../pages/LeadCreationPage/reducer';

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

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileSizeError, setFileSizeError] = useState(false);

  const { leadAttachmentId, leadDraftId, } = useSelector(state => ({
    leadAttachmentId: state.getIn(['leadCreation', 'leadAttachmentId']),
    leadDraftId: state.getIn(['leadCreation', 'leadDraftId']),
  }));

  const handleChange = (e) => {
    const fileList = e.target.files;
    const arrFiles = Array.from(fileList)

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
    }
  }

  const handleFileDelete = () => {
    setUploadedFiles([]);
    dispatch(deleteAttachmentLaunched(leadAttachmentId))
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
            {uploadedFiles?.map(({ file, src, id }, index) => {
              return (
                <Box mx={2} key={`file-row${index}`}>
                  <Grid container direction="column" alignItems="center">
                    <div style={{ position: 'relative' }}>
                      <img src={fileIcon} alt="uploaded file" />
                      <IconButton
                        onClick={handleFileDelete}
                        disableRipple
                        className={classes.closeButton}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                    <Box my={1}>
                      <Typography className={fileSizeError ? classes.maxedFileSize : null}>{file.name}</Typography>
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
