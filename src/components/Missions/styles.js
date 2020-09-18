import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
    noMissionTitle: {
        color: theme.palette.secondary.medium,
        lineHeight: '29px',
    },
    noMissionSubtitle: {
        color: theme.palette.secondary.medium,
        fontFamily: 'Basier Regular',
        fontSize: '17px',
        lineHeight: '29px',
        letterSpacing: '-0.45px'
    }
}));
