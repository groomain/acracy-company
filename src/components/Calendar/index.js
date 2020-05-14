import React, { useState } from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';

import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import styles from './styles';

import 'moment/locale/fr';
moment.locale('fr');

export const Calendar = () => {
  const classes = styles();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          // disableToolbar
          variant="dialog"
          format="MM/dd/yyyy"
          DialogProps={{ classes: { root: classes.root }, PaperProps: { classes: { root: classes.paper } } }}
          //   margin="normal"
          //   id="date-picker-inline"
          //   label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          // // KeyboardButtonProps={{
          // //   'aria-label': 'change date',
          // // }}
          minDate={new Date()}
          style={{ height: 20 }}
          // value={currentDate}
          // leftArrowIcon={<KeyboardArrowLeft />}
          // rightArrowIcon={<KeyboardArrowRight />}
          // onChange={this.handleDateChange}
          ampm={false}
          // emptyLabel={this.props.placeholder}
          // label={this.props.value === '' ? this.props.placeholder : null}
          format='LL LT'
          showTabs={false}
        // InputProps={{
        //   className: isSafari ? classes.root : null, startAdornment: (
        //     <InputAdornment position="start">
        //       <Today color='primary' style={{ fontSize: 30 }} />
        //     </InputAdornment>
        //   )
        // }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default Calendar;