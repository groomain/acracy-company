import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles';
import Typography from '@material-ui/core/Typography';
import { Collapse } from "@material-ui/core";
import clsx from "clsx";
import {closeSnackBar} from "../App/reducer";
import {useDispatch, useSelector} from "react-redux";

export const CustomSnackBar = ({ ...props }) => {
  const classes = styles();
  const dispatch = useDispatch();

  const { snackBarOpen, snackBarError, snackBarMessage, snackBarEmoji } = useSelector(state => ({
    snackBarOpen: state.getIn(['app', 'snackBarOpen']),
    snackBarMessage: state.getIn(['app', 'snackBarMessage']),
    snackBarEmoji: state.getIn(['app', 'snackBarEmoji']),
    snackBarError: state.getIn(['app', 'snackBarError'])
  }));

  return (
    <Collapse in={snackBarOpen}>
      <div className={clsx(classes.snackbar, { [classes.redSnack]: snackBarError })}>
        <Typography className={classes.typo}>{snackBarEmoji} {snackBarMessage}</Typography>
        <IconButton size="small" className={classes.iconButton} aria-label="close" onClick={() => dispatch(closeSnackBar())}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    </Collapse>
  );
};

export default CustomSnackBar;
