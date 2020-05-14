import React from 'react';
import ProviderWrapper from '../../../utils/Provider';

import TagsList from '../../../components/Tags/TagsList';

export default {
  title: 'Components|TagsList'
};

const tags = [{
  title: "Facebook",
}, {
  title: "Instagram",
}, {
  title: "Présentation écrite"
}, {
  title: "Facebook",
}, {
  title: "Instagram",
}, {
  title: "Présentation écrite"
}, {
  title: "Facebook",
}, {
  title: "Instagram",
}, {
  title: "Présentation écrite"
}, {
  title: "Facebook",
}, {
  title: "Instagram",
}, {
  title: "Présentation écrite"
},
]

export const withDefault = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
      <TagsList tags={tags} panelTitle="Démarrer ma sélection" />
    </div>
  )
);
