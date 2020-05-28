import React from 'react';
import styles from './styles';
import Avatar from '@material-ui/core/Avatar';

export const CircleImage = ({ theme, variant, src, alt, ...props }) => {
  const classes = styles();

  return (
    <Avatar
      alt={alt}
      src={src}
      className={`${classes.icon} ${classes[theme]}`}
    >
      p
    </Avatar >
  );
};

export default CircleImage;