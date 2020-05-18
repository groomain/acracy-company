import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useFileUpload from './useFileUpload';
import DarkWrapper from '../../Layout/DarkWrapper';
import fileIcon from '../../../assets/icons/file-icon.svg';
import uploadFileIcon from '../../../assets/icons/upload-file.svg';
import { CloseIcon } from '../../../assets/icons/CloseIcon';
import { Grid, Typography, Box, IconButton } from '@material-ui/core';
import styles from './styles';

import CustomSnackBar from '../../SnackBar';
import { formatLongText } from '../../../utils/format';

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

export const Upload = ({ children }) => {
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

  const [open, setOpen] = useState(true);

  return (
    <>
      <Box my={3}>
        <Typography variant="h1">{t('upload.title')}</Typography>
      </Box>
      <Box my={2}>
        <Typography variant="body1">{t('upload.subtitle')}</Typography>
      </Box>
      <DarkWrapper>
        <form className="form" onSubmit={onSubmit}>
          <Grid container>
            {files.map(({ file, src, id }, index) => {
              return (
                <Box mx={2} key={`file-row${index}`}>
                  <Grid container direction="column" alignItems="center" className={classes.uploadIconWrapper}>
                    <div style={{ position: 'relative' }}>
                      <img src={fileIcon} alt="uploaded file" />
                      <IconButton
                        onClick={() => console.log("deleted")}
                        disableRipple
                        className={classes.closeButton}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                    <Box my={1}>
                      <Typography className={status === "UPLOAD_ERROR" ? classes.maxedFileSize : null}>{file.name.length > 12 ? formatLongText(file.name) : file.name}</Typography>
                    </Box>
                  </Grid>
                </Box>
              )
            })}
            <Grid container direction="column" alignItems="center" className={classes.uploadIconWrapper}>
              <Input onChange={onChange} />
              <Box my={1}>
                {t('upload.addDocument')}
              </Box>
            </Grid>
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