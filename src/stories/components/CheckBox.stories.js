import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomCheckBox from "../../components/CheckBox";

export default {
  title: 'Components|CheckBox',
  component: CustomCheckBox
};

export const withDefault = () => (
  ProviderWrapper(
      <CustomCheckBox/>
  )
);

