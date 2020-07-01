import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
    container: {
        width: 337,
        borderRadius: 15,
        height: 256,
        maxHeight: 323,
    },
    row: {
        padding: 8,
    },
    navLink: {
        display: 'flex',
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Basier Regular',
        color: '#fff',
        textDecoration: 'none',
        '&:hover': {
            cursor: 'pointer',
            color: `${theme.palette.primary.main}`,
        }
    },
    closeIcon: {
        position: 'absolute',
        top: 20,
        right: 10,
        '&:hover': {
            cursor: 'pointer',
            color: `${theme.palette.primary.main}`,
        },
    },
    list: {
        padding:0,
        borderRadius: 15,

    },
    paper: {
        borderRadius: 15,
        backgroundColor: 'rgb(13, 17, 13, 0.96)',
    }
}));
