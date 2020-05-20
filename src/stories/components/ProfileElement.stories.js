import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import ProfileElement from '../../components/ProfileElement';

export default {
  title: 'Components|ProfileElement',
  component: ProfileElement
};

export const WithSensibility = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
      <ProfileElement
        category='Sensibilité'
        item1='Activation'
        item2='sensation'
      />
    </div>
  )
);

export const WithLanguages = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
      <ProfileElement
        category='Langues'
        item1='Anglais courant'
        item2='Italien Natif'
        item3=''
      />
    </div>
  )
);

export const WithSeniority = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
      <ProfileElement
        category='Séniorité'
        item1="(plus de 5 ans d'expérience)"
        item2=''
        item3=''
      />
    </div>
  )
);