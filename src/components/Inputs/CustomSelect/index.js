import React, { useState } from 'react';
import { Typography, Select, Box, MenuItem, ListItemText } from '@material-ui/core';
import styles from '../styles';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import CustomCheckbox from '../../CheckBox';

export const CustomSelect = ({ label, value, placeholder, onUpdateSelection, context, type, error, isMulti, optionsValues, ...props }) => {
  const classes = styles();

  const [open, setOpen] = useState(false);

  // Keep state + handleChange for the multi-select component for now
  const [options, setOptions] = useState([]);
  const handleChange = (event) => {
    setOptions(event.target.value);
    onUpdateSelection(event.target.value); // used in lead creation form component
  };

  const renderCounter = (options) => {
    const len = options.length;
    return (
      !options ?
        (<Typography>toto</Typography>) : (<Typography>{len} livrable{len > 1 ? <span>s</span> : null} sélectionné{len > 1 ? <span>s</span> : null}</Typography>)
    )
  }

  return (
    <Box style={{ height: '140px' }}>
      <Typography variant='h4'>{label}</Typography >
      <Select
        type={type}
        fullWidth
        multiple={isMulti}
        context={context}
        renderValue={isMulti && (context === 'deliverables' ? renderCounter : ((selected) => selected.join(' ')))}
        // renderValue={isMulti && ((selected) => selected.join(' '))}
        // value={options}
        value={isMulti ? options : value}
        error={error}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={isMulti && handleChange}
        defaultValue={context === 'profileType' ? (optionsValues[optionsValues.length - 1]) : ''}
        classes={{ root: open ? `${classes.root} ${classes.open}` : classes.root }}
        disableUnderline
        IconComponent={KeyboardArrowDownRoundedIcon}
        inputProps={{ classes: { root: `${classes.input} ${error ? classes.error : null}`, icon: open ? `${classes.icon} ${classes.iconClosed}` : classes.icon } }}
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