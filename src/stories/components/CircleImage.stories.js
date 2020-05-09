import React from 'react';
import ProviderWrapper from '../../utils/Provider';

import { CircleImage } from '../../components/CircleImage/';

export default {
  title: 'Components|CircleImage',
  component: CircleImage
};
const photoLink = 'https://cdn-media.rtl.fr/cache/p0NFoli1OBEqRtMwTbdztw/880v587-0/online/image/2015/0403/loveok_141338438169183900.jpg';

const styles = {
  padding: '3rem',
  background: '#283028'
};

export const avatarSmallWithPlaceHolder = () => (
  ProviderWrapper(
    <div style={styles}>
      <CircleImage src='' alt='?' theme='avatarSmall' />
    </div>
  )
);

export const avatarLargeWithPlaceHolder = () => (
  ProviderWrapper(
    <div style={styles}>
      <CircleImage src='' alt='?' theme='avatarLarge' />
    </div>
  )
);

export const avatarSmallSize = () => (
  ProviderWrapper(
    <div style={styles}>
      <CircleImage src={photoLink} alt="avatar" theme='avatarSmall' />
    </div>
  )
);

export const avatarLargeSize = () => (
  ProviderWrapper(
    <div style={styles}>
      <CircleImage src={photoLink} alt="avatar" theme='avatarLarge' />
    </div>
  )
);