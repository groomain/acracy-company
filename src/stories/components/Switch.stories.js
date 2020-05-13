import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import CustomSwitch from '../../components/Switch';

export default {
    title: 'Components|Switch',
    component: CustomSwitch
};

export const WithSmall = () => (
    ProviderWrapper(
        <div style={{ margin: '3rem' }}>
            <CustomSwitch switchSize='small' />
        </div>

    )
);

export const WithLarge = () => (
    ProviderWrapper(
        <div style={{ margin: '3rem' }}>
            <CustomSwitch switchSize="large" />
        </div>
    )
);
