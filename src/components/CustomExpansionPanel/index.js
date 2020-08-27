import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { setExpansionPanelOpen } from '../../pages/LeadCreationPage/reducer';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';

import styles from './styles';

const CustomExpansionPanel = ({ children, isTag, panelTitle, id, ...props }) => {
  const classes = styles();
  const dispatch = useDispatch();

  const { expansionPanelOpen } = useSelector(state => ({
    expansionPanelOpen: state.getIn(['leadCreation', 'expansionPanelOpen']),
  }));

  // Handle panels expansion individually
  const [open, setOpen] = useState();

  useEffect(() => {
    if (!expansionPanelOpen) {
      setOpen(false)
    }
  }, [expansionPanelOpen]);

  const handleChange = (id) => (expanded) => {
    if (open === id) {
      setOpen(false)
      dispatch(setExpansionPanelOpen(false))
    } else {
      setOpen(expanded ? id : open)
      dispatch(setExpansionPanelOpen(expanded ? id : false));
    }
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel
        expanded={!!open}
        onChange={isTag ? handleChange(id) : () => setOpen(!open)}
        TransitionProps={{ unmountOnExit: true }}
        className={classes.panel} {...props}>
        <ExpansionPanelSummary
          className={classes.header}
          expandIcon={
            isTag
              ? (<AddIcon className={classes.addIcon} />)
              : (<ExpandMoreIcon className={classes.arrowIcon} />)
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4">{panelTitle}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={isTag ? classes.detailsContainer : null}>
          {children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default CustomExpansionPanel;
