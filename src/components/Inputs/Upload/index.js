import React from 'react';

import useFileUpload from './useFileUpload';
import fileIcon from '../../../assets/icons/file-icon.svg';
import uploadFileIcon from '../../../assets/icons/upload-file.svg';
import { CloseIcon } from '../../../assets/icons/CloseIcon';
import { IconButton } from '@material-ui/core';
import { Grid, Box } from '@material-ui/core';
import styles from './styles';

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

  return (
    <form className="form" onSubmit={onSubmit}>
      <Grid container>
        {files.map(({ file, src, id }, index) => {
          const cutout = file.name.slice(4, -4);
          const fileName = file.name.replace(cutout, '(...)');
          return (
            <Box mx={2} key={`file-row${index}`}>
              <Grid container direction="column" alignItems="center">
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
                  {file.name.length > 12 ? fileName : file.name}
                </Box>
              </Grid>
            </Box>
          )
        })}
        <Input onChange={onChange} />
      </Grid>
    </form>
  )
};

export default Upload;