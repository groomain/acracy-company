import React, { useState } from 'react';
import { Grid, Typography, FilledInput, InputLabel, Box } from '@material-ui/core';
import styles from './styles';

export const CustomTextArea = ({ label, placeholder, error, helperText, maxLength, ...props }) => {
  const classes = styles();
  const [value, setValue] = useState({
    missionDescription: '',
  });
  const [currentInputLength, setCurrentInputLength] = useState(0)

  const handleChange = prop => (event) => {
    setCurrentInputLength(event.target.value.length);
    setValue({ ...value, [prop]: event.target.value });
  };

  return (
    <Box>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <FilledInput
        classes={{ root: `${classes.root} ${error ? classes.error : null}`, input: classes.input }}
        label={label}
        placeholder={placeholder}
        disableUnderline
        rowsMin={3}
        fullWidth
        multiline
        onChange={handleChange('value')}
        error={error}
        inputProps={{ maxLength: maxLength }}
        {...props}
      />
      {maxLength && (
        <Grid container justify='flex-end'>
          <Typography variant='body2' className={classes.inputLength}>{currentInputLength} / {maxLength}</Typography>
        </Grid>
      )}
    </Box>
  );

};

export default CustomTextArea;
