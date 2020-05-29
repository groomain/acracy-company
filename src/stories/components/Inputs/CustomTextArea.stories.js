import React from 'react';
import ProviderWrapper from '../../../utils/Provider';
import { CustomTextArea } from "../../../components/Inputs/CustomTextArea";

export default {
  title: 'Components|TextArea',
  component: CustomTextArea
};

const label = 'Donnez un titre à votre mission'
const placeholder = 'Ex: Motion design pour stories Instagram'

const styles = {
  padding: '3rem'
};

export const withDefault = () => (
  ProviderWrapper(
    <div style={styles}>
      <CustomTextArea label={label} placeholder={placeholder} maxLength={500} />
    </div>
  )
);

export const withErrorMessage = () => (
  ProviderWrapper(
    <div style={styles}>
      <CustomTextArea label={label} placeholder={placeholder} error helperText="Veuillez donner un titre à votre mission" />
    </div>
  )
);