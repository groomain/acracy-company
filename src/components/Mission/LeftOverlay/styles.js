import makeStyles from '@material-ui/core/styles/makeStyles';
import {basierMedium} from "../../../utils/configureMaterialTheme";

export default makeStyles(theme => ({
    container: {
        backgroundColor: 'rgb(13, 17, 13, 0.96)',
        width: "100%",
        height: "100%",
        position: 'relative',
        right: '100%',
        borderRadius: '15px 0 0 15px',
        maxHeight: 323,
        paddingLeft: 17
    },
    row: {
        padding: 8,
    },
    navLink: {
        display: 'flex',
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 14,
        color: '#fff',
        textDecoration: 'none',
        '&:hover': {
            color: `${theme.palette.primary.main}`,
        },
        '&:hover > g': {
            color: `${theme.palette.primary.main}`,
        }
    },
    icon: {
      color: 'red'
    },
    closeIcon: {
        position: 'absolute',
        top: 20,
        right: 10,
        '&:hover': {
            cursor: 'pointer',
            color: `${theme.palette.primary.main}`,
        },
    }
}));
