import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomNavLink from "../../components/CustomNavLink";

export default {
  title: 'Components|NavLink',
  component: CustomNavLink
};

const styles = {
  padding: '3rem'
};

export const withDefault = () => (
  ProviderWrapper(
    <div style={styles}>
      <CustomNavLink to={'/'} text={"Clique ici"} />
    </div>
  )
);

