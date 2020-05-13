import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import Tip from '../../components/Tip';

export default {
  title: 'Components|Tip',
  component: Tip
};

export const WithDefault = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
      <Tip
        title='#01'
        subtitle='Mieux vaut trop'
        description="Donnez le plus d'informations possible sur la mission et vos attentes, mais aussi sur le contexte du projet (équipes, objectifs, format du travail, deadlines)."
        linkTitle=''
        Url=''
      />
    </div>
  )
);

export const WithURL = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
      <Tip
        title='#02'
        subtitle='Donnez envie'
        description="Nos freelances sont très demandés, et souvent très occupés. N'hésitez pas à mentionner les avantages de travailler sur votre projet pour les aider à se décider."
        linkTitle='Découvrez nos conseils pour les briefs parfaits'
        Url='/tips'
      />
    </div>
  )
);