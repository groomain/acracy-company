import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
    root: {
        border: `1px solid ${theme.palette.secondary.medium}`,
        minHeight: 140,
        width: 593,
        overflow: 'scroll',
        borderRadius: 15,
        backgroundColor: 'rgba(86, 94, 86, 0.1)',
        transition: theme.transitions.create(['border-color']),
        caretColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
        fontWeight: 500,
        '&$focused': {
            backgroundColor: 'inherit',
            borderColor: theme.palette.secondary.main,
        },
        '& .MuiFilledInput-input': {
            padding: '0 30px',
            color: theme.palette.secondary
        },
        '& ::-webkit-resizer': {
            display: 'none'
        },
        resize: 'none'
    },
    placeholder: {
        fontSize: 17,
        // color: theme.palette.secondary.main,
        color: 'red',
        fontWeight: 500
    },
    label: {
        fontSize: 17,
        color: theme.palette.secondary.main,
        fontWeight: 500
    }
}));
