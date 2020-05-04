import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomNavLink from "../../components/CustomNavLink";

export default {
  title: 'Components|NavLink',
  component: CustomNavLink,
  parameters: {
    backgrounds: [
      { name: 'colored-theme', value: '#26a69a', default: true },
    ]
  },
};

export const withDefault = () => (
  ProviderWrapper(
      <>
        <h4>Change Storybook's background color to see the colored theme button color</h4>
    <CustomNavLink to={'/'} text={"Clique ici"} />
    </>
  )
);

