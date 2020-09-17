import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
    container: {
        marginTop: 78
    },
    leftContainer: {
        minHeight: '100vh',
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
    switch: {
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
    snackBar: {
        width: 'auto',
        backgroundColor: '#ecf805',
        color: 'black',
        borderRadius: '28px',
        height: 46,
        paddingLeft: 15,
        paddingRight: 15
    },
    typoSnackBar: {
        fontSize: 17,
        fontFamily: 'Basier Regular',
        color: theme.palette.secondary.black,
        marginRight: 10,
        marginLeft: 10
    }
}));
