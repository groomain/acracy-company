import makeStyles from '@material-ui/core/styles/makeStyles';
import icon from '../../assets/icons/checkbox-checked.svg'
import smallIcon from '../../assets/icons/checkbox-checked-black.svg';

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
  },
  small: {
    borderRadius: 4,
    width: 28,
    height: 28,
    '&:before': {
      backgroundImage:
        `url(${icon})`,
      backgroundSize: '60%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '-15% -15%'
    },
    'input:hover ~ &': {
      borderColor: theme.palette.secondary.black,
    }
  },
  rounded: {
    borderRadius: 50,
    width: 28,
    height: 28,
    '&:before': {
      backgroundImage:
        `url(${smallIcon})`,
      backgroundSize: '60%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '-15% -15%'
    },
    'input:hover ~ &': {
      borderColor: theme.palette.secondary.black,
    }
  }
}));
