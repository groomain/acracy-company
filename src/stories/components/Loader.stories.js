import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomLoader from "../../components/Loader";

export default {
  title: 'Components|CustomLoader',
  component: CustomLoader
};

const styles = {
  padding: '3rem'
};

export const withDefault = () => (
  ProviderWrapper(
    <div style={styles}>
        <CustomLoader/>
    </div>
  )
);

