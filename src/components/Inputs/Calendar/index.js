import React, { useState } from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';

import { Typography, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Agenda } from '../../../assets/icons/Agenda';
import styles from './styles';

import { capitalize } from '../../../utils/format';

import 'moment/locale/fr';
moment.locale('fr');

class LocalizedUtils extends MomentUtils {
  getDatePickerHeaderText(date) {
    const newDate = date.format("LLLL").slice(0, -5);
    return capitalize(newDate);
  }
}

export const Calendar = ({ error, label }) => {
  const classes = styles();

  const [selectedDate, setSelectedDate] = useState();

  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={'fr'}>
      <Typography variant="h4">{label}*</Typography>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          // disableToolbar
          variant="inline"
          format="DD/MM/yyyy"
          InputProps={{ className: `${classes.root} ${error ? classes.error : null}` }}
          orientation="landscape"
          margin="normal"
          id="date-picker-inline"
          value={selectedDate}
          onChange={setSelectedDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          PopoverProps={{ PaperProps: { classes: { root: classes.paper } } }}
          keyboardIcon={<Agenda />}
          minDate={new Date()}
          style={{ width: '100%' }}
          invalidDateMessage=""

        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default Calendar;