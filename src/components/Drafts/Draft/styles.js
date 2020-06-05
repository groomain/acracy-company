import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from "@material-ui/core";

export default makeStyles(theme => ({
  draft: {
    background: theme.palette.secondary.mid,
    borderRadius: 15,
    width: 339,
    height: 200,
    padding: '10px 20px',
    position: 'relative',
    margin: 15,
  },
  titleBox: {
    margin: '27px 50px 15px 0',
    '& h3': {
      lineHeight: 1.55
    }
  },
  iconBox: {
    marginRight: '.8rem',
    display: 'flex',
    height: '3rem',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `${fade(theme.palette.secondary.overlay, 0.85)}`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  newDraft: {
    color: theme.palette.primary.main
  },
  toUppercase: {
    textTransform: 'uppercase',
    fontSize: 15
  },
  firstBriefTitle: {
    lineHeight: .5
  }
}));