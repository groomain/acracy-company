import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import moment from 'moment';
import MomentUtils from '@date-io/moment';

import { Typography, Grid, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Agenda } from '../../../assets/icons/Agenda';
import { setDateFromCalendar } from '../../../pages/LeadCreationPage/reducer';
import styles from './styles';

import { capitalize } from '../../../utils/services/format';

import 'moment/locale/fr';
moment.locale('fr');

class LocalizedUtils extends MomentUtils {
  getDatePickerHeaderText(date) {
    const newDate = date.format("LLLL").slice(0, -5);
    return capitalize(newDate);
  }
}

export const Calendar = ({ error, label, minDate, startDate, onChange, handleChange, value }) => {
  const classes = styles();
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState();



  // useEffect(() => {
  //   console.log("startDate " + startDate)
  //   console.log("minDate " + minDate)
  // }, [startDate, minDate])

  const change = (name, e) => {
    console.log("change function", e)
    // handleChange(name);
    // setFieldTouched(name, true, false);
  };

  const setDate = (e) => {
    // setSelectedDate(e)
    const timestamp = e._d.getTime() + 86400000; // Add 1 day to send the right date
    // handleChange(e)
  }
  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={'fr'}>
      <Typography variant="h4">{label}</Typography>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          // disableToolbar
          variant="inline"
          format="DD/MM/yyyy"
          InputProps={{ className: `${classes.root} ${error ? classes.error : null}` }}
          orientation="landscape"
          margin="normal"
          name='missionContext.startDate'
          id='missionContext.startDate'
          value={value}
          onChange={(e) => handleChange(e)}
          // handleChange={(e) => handleChange(e)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          PopoverProps={{ PaperProps: { classes: { root: classes.paper } } }}
          keyboardIcon={<Agenda />}
          minDate={minDate}
          style={{ width: '100%' }}
          invalidDateMessage=""
          minDateMessage={null} // Disable the error message when startDate is inferior to minDate, but keep anterior dates disabled
          autoOk
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default Calendar;