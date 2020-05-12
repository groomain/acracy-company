import React, { useState } from 'react';
import { Typography, Select, FormHelperText, Box, MenuItem, ListItemText } from '@material-ui/core';
import styles from '../styles';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import CustomCheckbox from '../../CheckBox';

export const CustomSelect = ({ label, value, placeholder, type, error, isMulti, optionsValues, ...props }) => {
  const classes = styles();

  const [options, setOptions] = useState([]);

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setOptions(event.target.value);
  };

  return (
    <Box style={{ height: '140px' }}>
      <Typography variant='h4'>{label}</Typography >
      <Select
        type={type}
        fullWidth
        multiple={isMulti}
        renderValue={isMulti && ((selected) => selected.join(' '))}
        value={options}
        error={error}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={handleChange}
        classes={{ root: open ? `${classes.root} ${classes.open}` : classes.root }}
        disableUnderline
        IconComponent={KeyboardArrowDownRoundedIcon}
        inputProps={{ classes: { root: classes.input, icon: open ? `${classes.icon} ${classes.iconClosed}` : classes.icon } }}
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
        {!isMulti && optionsValues.map((option) => <MenuItem key={option}
          value={option}
          classes={{ root: `${classes.menuItem} ${classes.menutItemWithFocus}` }}
        >
          {option}
        </MenuItem>
        )}
        {isMulti && (
          optionsValues.map((option) => (
            <MenuItem key={option} value={option}
              classes={{ root: classes.menuItem, selected: classes.selected }}
            >
              <ListItemText primary={option} />
              <CustomCheckbox
                checked={options.indexOf(option) > -1}
                size="small"
              />
            </MenuItem>
          ))
        )}
      </Select>
    </Box >
  );
};

export default CustomSelect;