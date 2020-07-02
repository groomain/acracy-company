import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
    container: {
        marginTop: 100
    },
    leftContainer: {
        backgroundColor: theme.palette.secondary.dark
    },
    card: {
        width: '80%',
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: '15px',
        padding: 20
    },
    cardTitle: {
        padding: 20,
        marginBottom: 5
    },
    textfield: {
        marginTop: 15,
        marginBottom: 15
    },
    switchTVA: {
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 25
    },
    tva: {
        width: 215,
        paddingLeft: 15
    },
    saveButton: {
        width: 191
    }
}));
