import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from "@material-ui/core";

import { theme } from '../../utils/configureMaterialTheme';

export default makeStyles(theme => ({
  searchbar: {
    '& .react-select__option--is-focused': {
      background: theme.palette.primary.main
    }
  },
  optionValue: {
    fontFamily: "Basier Medium"
  },
  img: {
    height: 40
  },
  searchImg: {
    height: 25,
    margin: '0 .5rem 0 10px'
  },
  value: {
    color: theme.palette.secondary.medium,
  },
  highlight: {
    background: 'none',
    fontWeight: 600,
    color: theme.palette.secondary.black
  },
  createOption: {
    color: theme.palette.secondary.medium,
    fontFamily: "Basier Regular"
  }
}));

const reactSelectStyles = {
  container: styles => {
    return {
      ...styles,
      height: 84
    }
  },
  control: (base, state) => ({
    ...base,
    borderRadius: 15,
    height: '100%',
    minWidth: 400,
    display: 'flex',
    alignItems: 'center',
    cursor: 'text',
    boxShadow: 'none',
    border: 'none',
    color: theme.palette.secondary.medium,
    fontSize: 17,
  }),
  clearIndicator: styles => {
    return {
      ...styles,
      marginRight: 20
    }
  },
  placeholder: styles => {
    return {
      ...styles,
      color: fade(theme.palette.secondary.medium, 0.4)
    }
  },
  indicatorsContainer: styles => {
    return {
      ...styles,
      cursor: 'pointer'
    }
  },
  groupHeading: styles => {
    return {
      ...styles,
      fontSize: 17,
      color: theme.palette.secondary.black,
      textTransform: 'capitalize',
      marginLeft: 15,
      fontFamily: "Basier Medium"
    }
  },
  valueContainer: styles => {
    return {
      ...styles,
      borderRadius: 15,
      fontFamily: 'Basier Medium'
    }
  },
  menu: styles => {
    return {
      ...styles,
      borderRadius: 15,
      width: '200%',
      minWidth: 400,
      overflowStyle: 'none', // IE scrollbar
      scrollbarWidth: 'none', // Firefox scrollbar
      scrollbarColor: 'transparent transparent', // Firefox scrollbar
      '& ::-webkit-scrollbar': {
        width: 0,
      }
    }
  },
  menuList: styles => {
    return {
      ...styles,
      borderRadius: 15
    }
  },
  option: styles => {
    return {
      ...styles,
      display: 'flex',
      alignItems: 'center',
      background: 'transparent',
      paddingLeft: 40,
      fontSize: 14,
      minHeight: 50,
      cursor: 'pointer',
      transition: '.1s',
      fontFamily: 'Basier Regular',
      color: theme.palette.secondary.medium,
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${fade(theme.palette.secondary.light, 0.2)}`
      }
    };
  },
  noOptionsMessage: styles => {
    return {
      ...styles,
      fontSize: 14,
      paddingLeft: 40,
      textAlign: 'left'
    }
  },
};

export { reactSelectStyles };