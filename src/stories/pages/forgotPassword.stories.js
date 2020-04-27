import React from 'react';
import ForgotPassword from '../../pages/ForgotPassword';
import ProviderWrapper from '../../utils/Provider';

export default {
  title: 'Pages',
};
export const forgotPassword = () => (
  ProviderWrapper(<ForgotPassword state="forgot_password" />)
);
