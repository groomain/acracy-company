import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { Grid, Typography, FilledInput, InputLabel, Box } from '@material-ui/core';
import styles from './styles';

export const CustomTextArea = ({ label, placeholder, error, helperText, maxLength, valueOut, handleChangeOut, size, ...props }) => {
  const classes = styles();
  const { t } = useTranslation();

  // const [value, setValue] = useState({
  //   missionDescription: '',
  // });
  const [currentInputLength, setCurrentInputLength] = useState(0);

  const handleChange = prop => (event) => {
    setCurrentInputLength(event.target.value.length);
    // setValue({ ...value, [prop]: event.target.value });
  };

  return (
    <Box>
      <Typography variant='h4' className={classes.label}>{label}</Typography>
      <FilledInput
        classes={{ root: `${classes.root}`, input: clsx(classes.input, classes[size], error ? classes.error : null) }}
        label={label}
        placeholder={placeholder}
        disableUnderline
        fullWidth
        multiline
        value={valueOut || ''}
        onChange={handleChangeOut ? (event) => handleChangeOut(event.target.value) : handleChange('value')}
        inputProps={{ maxLength: maxLength }}
        {...props}
      />
      {maxLength && (
        <Grid container justify='flex-end'>
          <Typography variant='body2' className={classes.inputLength}>{valueOut ? valueOut.length : currentInputLength.length} / {maxLength} {t('characters')}</Typography>
        </Grid >
      )}
    </Box >
  );

};

export default CustomTextArea;
