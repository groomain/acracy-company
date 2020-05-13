import React from 'react';
import styles from './styles';
import IconButton from "@material-ui/core/IconButton";

export const CustomIconButton = ({ icon, ...props }) => {
    const classes = styles();
    return (
        <IconButton
            edge={'end'}
            color="secondary" aria-label="notif"
            children={<span style={{
                width: 54,
                height: 54,
                backgroundImage: `url(${icon})`,
                backgroundRepeat: 'no-repeat',
                content: '""',
            }} />}
            {...props}/>
    );
};

export default CustomIconButton;
