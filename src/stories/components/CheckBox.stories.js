import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomCheckBox from "../../components/CheckBox";

export default {
  title: 'Components|CheckBox',
  component: CustomCheckBox, parameters: {
    backgrounds: [
      { name: 'colored-theme', value: '#283028', default: true },
    ]
  },
};

export const withDefault = () => (
  ProviderWrapper(
    <CustomCheckBox />
  )
);

