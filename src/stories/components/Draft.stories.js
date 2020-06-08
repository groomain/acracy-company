import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import Draft from '../../components/Drafts/Draft';
import Drafts from '../../components/Drafts/DraftsWrapper';

import { leads } from '../../mocks/leads';

export default {
  title: 'Components|Drafts',
  component: Drafts
};

const styles = {
  padding: '3rem'
}


const draft = leads[0];

export const withDefault = () => (
  ProviderWrapper(
    <div style={styles}>
      <Draft draft={draft} />
    </div>
  )
);

export const withList = () => (
  ProviderWrapper(
    <div style={styles}>
      <Drafts drafts={leads}>
        <Draft draft={draft} />
      </Drafts>
    </div>
  )
);

const twoDrafts = leads.slice(0, 2);

export const withLessThan3 = () => (
  ProviderWrapper(
    <div style={styles}>
      <Drafts drafts={twoDrafts}>
        <Draft draft={draft} />
      </Drafts>
    </div>
  )
);

const noDrafts = [];

export const withEmptyList = () => (
  ProviderWrapper(
    <div style={styles}>
      <Drafts drafts={noDrafts} />
    </div>
  )
);

export const withLoading = () => (
  ProviderWrapper(
    <div style={styles}>
      <Drafts drafts={noDrafts} loading />
    </div>
  )
);
