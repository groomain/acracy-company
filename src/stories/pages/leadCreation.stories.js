import React from 'react';
import LeadCreationPage from '../../pages/LeadCreationPage';
import ProviderWrapper from '../../utils/Provider';

export default {
  title: 'Pages',
  component: LeadCreationPage
};

export const LeadCreation = () => (
  ProviderWrapper(<LeadCreationPage />)
);
