import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        position: 'relative',
    },
    top: {
        color: '#eef3fd',
    },
    bottom: {
        color: `#565e56`,
        animationDuration: '1250ms',
        position: 'absolute',
        left: 0,
    },
}));

export default function CustomLoader(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress
                variant="determinate"
                value={100}
                className={classes.top}
                size={45}
                thickness={2}
                {...props}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.bottom}
                size={45}
                thickness={2}
                {...props}
            />
        </div>    );
}
