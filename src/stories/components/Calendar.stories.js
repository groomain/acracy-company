import React from 'react';
import ProviderWrapper from '../../utils/Provider';

import Calendar from '../../components/Calendar/';

export default {
  title: 'Components|Calendar',
  component: Calendar
};

export const withDefault = () => (
  ProviderWrapper(
    <Calendar />
  )
);
