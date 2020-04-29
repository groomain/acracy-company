import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import styles from '../styles';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';

export const CustomSelect = ({ label, value, placeholder, type, error, helperText, ...props }) => {
  const classes = styles();

  const options = [{
    value: 'Fr : +33'
  }, {
    value: 'Blg : +32'
  }, {
    value: 'Blg : +34'
  }]

  const [age, setAge] = useState('Fr : +33');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box style={{ height: '140px' }}>
      <InputLabel variant='body1' error={error}>{label}*</InputLabel >
      <Select
        type={type}
        fullWidth
        value={age}
        error={error}
        onChange={handleChange}
        classes={{ root: classes.root, focused: classes.focused }}
        disableUnderline
        IconComponent={KeyboardArrowDownRoundedIcon}
        inputProps={{ classes: { root: classes.input, icon: classes.icon, focused: classes.focused } }}
        MenuProps={{
          classes: { paper: classes.dropdownStyle },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: 'left'
          },
          transformOrigin: {
            vertical: "top",
            horizontal: 'left'
          },
          getContentAnchorEl: null
        }}
        {...props}
      >
        {options.map((option, key) => <MenuItem key={key} value={option.value} classes={{ root: classes.menuItem, selected: classes.selected }}>{option.value}</MenuItem>)}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </Box >
  );
};

export default CustomSelect;