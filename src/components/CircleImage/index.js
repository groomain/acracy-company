import React from 'react';

import { Typography } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import styles from './styles';

export const CircleImage = ({ theme, variant, src, alt, icon, ...props }) => {
  const classes = styles();

  return (
    <Avatar
      alt={alt}
      src={src && src}
      className={`${classes.icon} ${classes[theme]}`}
    >
      <Typography variant='h1'>{icon}</Typography>
    </Avatar >
  );
};

export default CircleImage;