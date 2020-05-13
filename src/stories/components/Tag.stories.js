import React from 'react';
import ProviderWrapper from '../../utils/Provider';

import Tag from '../../components/Tags/Tag';
import CheckableTag from '../../components/Tags/CheckableTag';

export default {
  title: 'Components|Tags'
};

export const withDefault = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
      <Tag title="I'm Tag" isPrimaryColor={false} />
    </div>
  )
);

export const withPrimaryColor = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
      <Tag title="FaceTag" isPrimaryColor />
    </div>
  )
);

export const withCheckableTag = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
      <CheckableTag title="Tik Tok" />
    </div>
  )
);

export const greyCheckableTag = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
      <CheckableTag title="Autres" isGrey />
    </div>
  )
);

export const disabledCheckableTag = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
      <CheckableTag title="Autres" disabled isGrey />
    </div>
  )
);
