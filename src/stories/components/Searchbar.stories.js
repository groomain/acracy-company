import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import Searchbar from "../../components/Searchbar";

export default {
  title: 'Components|Searchbar',
  component: Searchbar
};

const styles = {
  padding: '3rem'
}

export const withDefault = () => (
  ProviderWrapper(
    <div style={styles}>
      <Searchbar />
    </div>
  )
);

