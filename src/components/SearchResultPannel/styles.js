import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    pannel: {
        paddingTop: '15.3rem'
    },
    researchGridItem: {
        padding: '30px 0',
        height: 33,
        alignItems: 'center',
    },
    searchIcon: {
        color: theme.palette.primary.main
    },
    collaboratorsGridItem: {
        padding: '35px 0'
    },
    iconContainer: {
        height: '30vh',
        alignItems: 'center'
    }
}));
