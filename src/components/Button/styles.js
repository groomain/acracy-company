import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  button: {
    height: 56,
    minWidth: 165,
    padding: '0 1rem',
    textTransform: 'none',
    fontSize: 14,
    fontWeight: 500,
    margin: '1rem 0',
    lineHeight: 1.57,
    borderRadius: '8px',
    border: '1px solid #fff',
    color: '#fff',
    '&.Mui-disabled': {
      color: theme.palette.secondary.medium,
      textDecoration: 'none'
    }
  },
  secondaryButton: {
    border: `1px solid ${theme.palette.secondary.medium}`,
    color: '#fff',
    '&:hover': {
      background: `${theme.palette.secondary.medium}`,
      border: '1px solid transparent'
    },
    '&:active': {
      background: `${theme.palette.secondary.greyButtonActive}`,
      border: `1px solid ${theme.palette.secondary.medium}`
    },
  },
  primaryButton: {
    border: `1px solid ${theme.palette.primary.main}`,
    color: '#fff',
    '&:hover': {
      background: `${theme.palette.primary.main}`,
      border: '1px solid transparent',
      color: `${theme.palette.secondary.black}`
    },
    '&:active': {
      background: `${theme.palette.primary.bright}`,
      border: `1px solid transparent`
    },
  },
  filledButton: {
    background: `${theme.palette.primary.main}`,
    border: `1px solid ${theme.palette.primary.main}`,
    color: `${theme.palette.secondary.black}`,
    '&:hover, &:active': {
      background: `${theme.palette.primary.bright}`
    }
  },
  asLink: {
    border: 'none',
    textDecoration: 'underline',
    margin: 0
  },
  disabledFilled: {
    background: theme.palette.secondary.medium,
    border: 'none',
    color: `${theme.palette.secondary.black} !important`
  },
  disabledOutlined: {
    borderColor: theme.palette.secondary.medium,
    color: theme.palette.secondary.medium
  },
  asLinkPrimary: {
    border: 'none',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    margin: 0,
    padding: 0,
    height: '1.5rem',
    fontSize: 17,
    '& span': {
      justifyContent: 'flex-start'
    }
  },
  outlinedBlackBorder: {
    borderColor: theme.palette.secondary.black,
    color: theme.palette.secondary.black
  },
  outlinedBlackBackground: {
    borderColor: theme.palette.secondary.black,
    backgroundColor: theme.palette.secondary.black,
    color: theme.palette.primary.main,
      '&:hover, &:active': {
          background: `${theme.palette.secondary.dark}`
      }
  }
}));
