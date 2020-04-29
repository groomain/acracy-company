import makeStyles from '@material-ui/core/styles/makeStyles';
import icon from '../../assets/icons/checkbox-checked.svg'

export default makeStyles(theme => ({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: 8,
        width: 56,
        height: 56,
        border: 'solid 1px #565e56',
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
        'input:hover ~ &': {
            border: 'solid 1px #fff',
        },
    },
    checkedIcon: {
        '&:before': {
            border: 'transparent',
            display: 'block',
            width: 56,
            height: 56,
            backgroundImage:
                `url(${icon})`,
            content: '""',
        },
    }
}));
