import React from 'react';
import ProviderWrapper from '../../../utils/Provider';
import UploadInput from '../../../components/Inputs/LeadUpload';

export default {
  title: 'Components|Inputs'
};

const styles = {
  padding: '3rem'
}

export const upload = () => (
  ProviderWrapper(
    <div style={styles}>
      <UploadInput />
    </div>
  )
);
