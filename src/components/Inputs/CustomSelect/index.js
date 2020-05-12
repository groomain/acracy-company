import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import styles from '../styles';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';

export const CustomSelect = ({ label, value, placeholder, type, error, ...props }) => {
  const classes = styles();

  const options = [{
    value: 33,
    title: 'Fr : +33'
  }, {
    value: 32,
    title: 'Blg : +32'
  }, {
    value: 39,
    title: 'It : +39'
  }]

  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState(33);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Box style={{ height: '140px' }}>
      <Typography variant='h4'>{label}</Typography >
      <Select
        type={type}
        fullWidth
        value={inputValue}
        error={error}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={handleChange}
        classes={{ root: open ? `${classes.root} ${classes.open}` : classes.root, focused: classes.focused }}
        disableUnderline
        IconComponent={KeyboardArrowDownRoundedIcon}
        inputProps={{ classes: { root: classes.input, icon: open ? `${classes.icon} ${classes.iconClosed}` : classes.icon, focused: classes.focused } }}
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
        {options.map((option, key) => <MenuItem key={key} value={option.value} classes={{ root: classes.menuItem, selected: classes.selected }}>{option.title}</MenuItem>)}
      </Select>
    </Box >
  );
};

export default CustomSelect;