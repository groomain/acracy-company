import React from 'react';
import ProviderWrapper from '../../../utils/Provider';
import Tag from '../../../components/Inputs/Tag';

export default {
  title: 'Components|Inputs'
};

export const DefaultTag = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
      <Tag title="Tik Tok" />
    </div>
  )
);
