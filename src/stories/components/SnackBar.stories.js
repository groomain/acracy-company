import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomSnackBar from "../../components/SnackBar";

export default {
  title: 'Components|SnackBar',
  component: CustomSnackBar
};

export const withDefault = () => {
  const [open, setOpen] = React.useState(true);

  return (

ProviderWrapper(
    <CustomSnackBar open={open} setOpen={setOpen} message={"Ceci est une SnackBar"} />
  ))
};

export const withError = () => {
  const [open, setOpen] = React.useState(true);

  return (

ProviderWrapper(
    <CustomSnackBar open={open} error setOpen={setOpen} message={"Ceci est une SnackBar"} />
  ))
};

