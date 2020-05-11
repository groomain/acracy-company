import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import Draft from '../../components/Drafts/Draft';
import Drafts from '../../components/Drafts/DraftsWrapper';

export default {
  title: 'Components|Drafts',
  component: Drafts
};

const styles = {
  padding: '3rem'
}

const drafts = [{
  status: 'Status de brief',
  progress: 30,
  date: '22.04',
  time: '10h12',
  target: 'Web design',
  new: true
}, {
  status: 'Status de brief',
  progress: 70,
  date: '21.04',
  time: '12h09',
  title: 'Mon titre de brief très long sur deux lignes',
  target: 'Web design',
  new: false
}, {
  status: 'Status de brief',
  progress: 30,
  date: '22.04',
  time: '10h12',
  target: 'Web design',
  new: true
}, {
  status: 'Status de brief',
  progress: 70,
  date: '21.04',
  time: '12h09',
  title: 'Mon titre de brief très long sur deux lignes',
  target: 'Web design',
  new: false
}, {
  status: 'Status de brief',
  progress: 30,
  date: '22.04',
  time: '10h12',
  target: 'Web design',
  new: true
}, {
  status: 'Status de brief',
  progress: 70,
  date: '21.04',
  time: '12h09',
  title: 'Mon titre de brief très long sur deux lignes',
  target: 'Web design',
  new: false
},];

const draft = {
  status: 'Status de brief',
  progress: 30,
  date: '21.04',
  time: '12h09',
  target: 'Web design',
  new: true
};

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
      <Drafts drafts={drafts}>
        <Draft draft={draft} />
      </Drafts>
    </div>
  )
);

const twoDrafts = [{
  status: 'Status de brief',
  progress: 30,
  date: '22.04',
  time: '10h12',
  target: 'Web design',
  new: true
}, {
  status: 'Status de brief',
  progress: 70,
  date: '21.04',
  time: '12h09',
  title: 'Mon titre de brief très long sur deux lignes',
  target: 'Web design',
  new: false
}];

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
