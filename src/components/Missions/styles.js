import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
    noMissionTitle: {
        textAlign: 'center',
        color: theme.palette.secondary.medium,
        lineHeight: '29px',
    },
    noMissionSubtitle: {
        color: theme.palette.secondary.medium,
        letterSpacing: '-0.45px'
    }
}));
