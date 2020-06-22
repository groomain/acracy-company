import React from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Typography, FilledInput, InputLabel, Box } from '@material-ui/core';
import styles from './styles';

export const CustomTextArea = ({ label, placeholder, error, helperText, maxLength, valueOut, handleChangeOut, ...props }) => {

  const classes = styles();
  const { t } = useTranslation();

  // const [value, setValue] = useState({
  //   missionDescription: '',
  // });
  // const [currentInputLength, setCurrentInputLength] = useState(0);

  // const handleChange = prop => (event) => {
  //   // setCurrentInputLength(event.target.value.length);
  //   // setValue({ ...value, [prop]: event.target.value });
  // };

  return (
    <Box>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <FilledInput
        classes={{ root: `${classes.root} ${error ? classes.error : null}`, input: classes.input }}
        label={label}
        placeholder={placeholder}
        disableUnderline
        rowsMin={4}
        fullWidth
        multiline
        value={valueOut || ''}
        onChange={(event) => handleChangeOut(event.target.value)}
        error={error}
        inputProps={{ maxLength: maxLength }}
        {...props}
      />
      {maxLength && (
        <Grid container justify='flex-end'>
          <Typography variant='body2' className={classes.inputLength}>{valueOut.length} / {maxLength} {t('characters')}</Typography>
        </Grid>
      )}
    </Box>
  );

};

export default CustomTextArea;
