import React from 'react';
import ProviderWrapper from '../../../utils/Provider';

import Calendar from '../../../components/Inputs/Calendar';

export default {
  title: 'Components|Inputs',
  component: Calendar
};

const styles = {
  margin: '3rem',
  width: '50%'
}

export const calendar = () => (
  ProviderWrapper(
    <div style={styles}>
      <Calendar label="Choisis une date" />
    </div>
  )
);

export const calendarWithError = () => (
  ProviderWrapper(
    <div style={styles}>
      <Calendar label="Choisis une date" error />
    </div>
  )
);
