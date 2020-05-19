import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useFileUpload from './useFileUpload';
import DarkWrapper from '../../Layout/DarkWrapper';
import fileIcon from '../../../assets/icons/file-icon.svg';
import uploadFileIcon from '../../../assets/icons/upload-file.svg';
import { CloseIcon } from '../../../assets/icons/CloseIcon';
import { Grid, Typography, Box, IconButton } from '@material-ui/core';
import styles from './styles';

import CustomSnackBar from '../../SnackBar';

const Input = (props) => {
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

export const Upload = () => {
  const {
    files,
    pending,
    next,
    uploading,
    uploaded,
    status,
    onSubmit,
    onChange,
  } = useFileUpload();

  const classes = styles();
  const { t } = useTranslation();

  const [open, setOpen] = useState();
  const [uploadedFiles, setUploadedFiles] = useState();

  useEffect(() => {
    setUploadedFiles(files)
  }, [files])

  const handleFileDelete = () => {
    setUploadedFiles([]);
    setOpen(false)
  };

  useEffect(() => {
    if (status === "UPLOAD_ERROR") {
      setOpen(true)
    }
  }, [status])

  return (
    <>
      <Box my={3}>
        <Typography variant="h1">{t('upload.title')}</Typography>
      </Box>
      <Box my={2}>
        <Typography variant="body1">{t('upload.subtitle')}</Typography>
      </Box>
      <DarkWrapper justify='center'>
        <form className="form" onSubmit={onSubmit}>
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
                      <Typography className={status === "UPLOAD_ERROR" ? classes.maxedFileSize : null}>{file.name}</Typography>
                    </Box>
                  </Grid>
                </Box>
              )
            })}
            {uploadedFiles?.length < 1 && (
              <Grid container direction="column" alignItems="center" className={classes.uploadIconWrapper}>
                <Input onChange={onChange} />
                <Box my={1}>
                  {t('upload.addDocument')}
                </Box>
              </Grid>
            )}
          </Grid>
        </form>
      </DarkWrapper>
      {status === "UPLOAD_ERROR" && (
        <CustomSnackBar message={t('upload.maxFileSize')} open={open} setOpen={setOpen} error />
      )}
      <Box my={2}>
        <Typography variant="body1" color="primary">{t('upload.confidentialityText')}</Typography>
      </Box>
    </>
  )
};

export default Upload;