import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
    largeRoot: {
        width: 112,
        height: 56,
        padding: 0,
    },
    largeSwitchBase: {
        color: theme.palette.secondary.switchThumb,
        padding: 0,
        '&$checked': {
            transform: 'translateX(56px)',
            color: theme.palette.primary.main,
            '& + $largeTrack': {
                backgroundColor: theme.palette.secondary.switchGreen,
            },
            '& + $largeThumb': {
                color: theme.palette.primary.main,
            }
        },
    },
    largeThumb: {
        width: 56,
        height: 56,
    },
    largeTrack: {
        borderRadius: 50,
        backgroundColor: theme.palette.secondary.switchGreen,
        transition: theme.transitions.create(['background-color', 'border'])
    },
    smallRoot: {
        width: 76,
        height: 38,
        padding: 1
    },
    smallSwitchBase: {
        color: theme.palette.secondary.switchThumb,
        padding: 0,
        '&$checked': {
            transform: 'translateX(38px)',
            color: theme.palette.primary.main,
            '& + $smallTrack': {
                backgroundColor: theme.palette.secondary.switchGreen,
            },
            '& + $smallThumb': {
                color: theme.palette.primary.main,
            },
        }
    },
    smallThumb: {
        width: 38,
        height: 38
    },
    smallTrack: {
        borderRadius: 50,
        backgroundColor: theme.palette.secondary.switchGreen,
        transition: theme.transitions.create(['background-color', 'border'])
    },
    checked: {},
    focusVisible: {}
}));
