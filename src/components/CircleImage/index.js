import React from 'react';
import styles from './styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

export const CircleImage = ({ theme, variant, src, alt, ...props }) => {
    const classes = styles();

    return (
        <Avatar
            alt={alt}
            src={src ? src : PersonIcon}
            className={`${classes.avatar} ${classes[theme]}`}
        >
        </Avatar >
    );
};

export default CircleImage;