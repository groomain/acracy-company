import React from 'react';
import ProviderWrapper from '../../utils/Provider';

import { CircleImage } from '../../components/CircleImage/';

export default {
    title: 'Components|CircleImage',
    component: CircleImage,
    parameters: {
        backgrounds: [
            { name: 'colored-theme', value: '#283028', default: true }
        ]
    },
};
const photoLink = 'https://cdn-media.rtl.fr/cache/p0NFoli1OBEqRtMwTbdztw/880v587-0/online/image/2015/0403/loveok_141338438169183900.jpg';

export const avatarSmallWithPlaceHolder = () => (
    ProviderWrapper(
        <CircleImage src='' alt='?' theme='avatarSmall' />
    )
);

export const avatarLargeWithPlaceHolder = () => (
    ProviderWrapper(
        <CircleImage src='' alt='?' theme='avatarLarge' />
    )
);

export const avatarSmallSize = () => (
    ProviderWrapper(
        <CircleImage src={photoLink} alt="avatar" theme='avatarSmall' />
    )
);

export const avatarLargeSize = () => (
    ProviderWrapper(
        <CircleImage src={photoLink} alt="avatar" theme='avatarLarge' />
    )
);