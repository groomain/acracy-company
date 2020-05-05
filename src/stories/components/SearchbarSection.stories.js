import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import SuggestionsTitle from "../../components/Searchbar/SuggestionsTitle";
import profilIcon from '../../assets/icons/profil-roll-out-black.svg';
import projectIcon from '../../assets/icons/livrable-black.svg';

export default {
  title: 'Components|Searchbar Sections',
  component: SuggestionsTitle
};

const styles = {
  padding: '3rem'
}

export const withDefault = () => (
  ProviderWrapper(
    <>
      <div style={styles}>
        <SuggestionsTitle icon={profilIcon} title="Profils" />
      </div>

      <div style={styles}>
        <SuggestionsTitle icon={projectIcon} title="Livrables" />
      </div>
    </>
  )
);

