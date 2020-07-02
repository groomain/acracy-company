import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
    container: {
        marginTop: 100
    },
    leftContainer: {
        backgroundColor: theme.palette.secondary.dark
    },
    card: {
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: '15px',
        padding: 20,
    },
    element: {
        width: '80%',
        paddingTop: 100,
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
    },
    select: {
        width: '50%'
    },
    city: {
        marginTop: 15,
        marginBottom: 15,
        width: '68%',
        marginLeft: '4%'
    },
    zipCode: {
        marginTop: 15,
        marginBottom: 15,
        width: '28%',
    }
}));
