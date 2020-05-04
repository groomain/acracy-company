import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import { CustomTextArea } from "../../components/CustomTextArea";

export default {
    title: 'Components|TextArea',
    component: CustomTextArea,
    parameters: {
        backgrounds: [
            { name: 'colored-theme', value: '#162217', default: true },
        ]
    },
};
const label = 'Donnez un titre à votre mission'
const placeholder = 'Ex: Motion design pour stories Instagram'

export const withDefault = () => (
    ProviderWrapper(
        <CustomTextArea label={label} placeholder={placeholder} />
    )
);

export const withErrorMessage = () => (
    ProviderWrapper(
        <CustomTextArea label={label} placeholder={placeholder} error helperText="Veuillez donner un titre à votre mission" />
    )
);