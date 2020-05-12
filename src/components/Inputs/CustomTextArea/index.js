import React from 'react';
import { TextField, TextareaAutosize, FilledInput } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import styles from './styles';

export const CustomTextArea = ({ label, placeholder, error, helperText, ...props
}) => {
  const classes = styles();
  const [value, setValue] = React.useState({
    missionDescription: '',
  });

  const handleChange = prop => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  return (
    <Box>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <FilledInput
        classes={{ root: classes.root, input: classes.input }}
        label={label}
        placeholder={placeholder}
        shrink={false}
        disableUnderline
        rowsMin={3}
        fullWidth
        multiline
        onChange={handleChange('value')}
        error={error}
        {...props}
      />
    </Box>
  );

};

export default CustomTextArea;
