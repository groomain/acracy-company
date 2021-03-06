import React, { useState } from 'react';
import { Typography, Select, Box, MenuItem, ListItemText } from '@material-ui/core';
import styles from '../styles';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import CustomCheckbox from '../../CheckBox';

export const CustomSelect = ({ label, value, placeholder, type, error, isMulti, onUpdateSelection, optionsValues, handleChangeOut, context, withDisabledValue, className, checkedArray, ...props }) => {
  const classes = styles();

  const [open, setOpen] = useState(false);

  // Keep state + handleChange for the multi-select component for now
  const [options, setOptions] = useState(checkedArray?.map(x => x?.text));
  /*const handleChange = (event) => {
    if (event.target.value.length <= 5) {
      setOptions(event.target.value);
      onUpdateSelection(event.target.value); // used in lead creation form component
    }
  };*/

  const renderCounter = (options) => {
    const len = options.length;
    return (
      !options ?
        null : (<Typography>{len} livrable{len > 1 ? <span>s</span> : null} sélectionné{len > 1 ? <span>s</span> : null}</Typography>)
    )
  }

  return (
    <Box className={className}>
      <Typography variant='h4'>{label}</Typography >
      <Select
        type={type}
        fullWidth
        multiple={isMulti}
        context={context}
        value={isMulti ? options : value}
        error={error}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        classes={{ root: open ? `${classes.root} ${classes.open}` : classes.root }}
        disableUnderline
        IconComponent={KeyboardArrowDownRoundedIcon}
        inputProps={{ placeholder: placeholder, classes: { root: `${classes.input} ${error ? classes.error : null}`, icon: open ? `${classes.icon} ${classes.iconClosed}` : classes.icon } }}
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
        {!isMulti && optionsValues?.map((option) => <MenuItem
            key={option.value || option}
          value={option.value || option}
          disabled={withDisabledValue && (option.key || option) === (optionsValues[0].key || option)}
          classes={{ root: `${classes.menuItem} ${classes.menutItemWithFocus}` }}
        >
          {option.label || option}
        </MenuItem>
        )}
        {isMulti && (
          optionsValues.map((option) => (
            <MenuItem key={option} value={option}
              classes={{ root: classes.menuItem, selected: classes.selected }}
            >
              <ListItemText primary={option} />
              <CustomCheckbox
                checked={options?.indexOf(option) > -1}
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
