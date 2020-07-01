import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { setExpansionPanelOpen } from '../../pages/LeadCreationPage/reducer';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';

import styles from './styles';

const CustomExpansionPanel = ({ children, isTag, panelTitle, ...props }) => {
  const classes = styles();
  const dispatch = useDispatch();

  const { expansionPanelOpen } = useSelector(state => ({
    expansionPanelOpen: state.getIn(['leadCreation', 'expansionPanelOpen']),
  }));

  const handleChange = expansionPanelOpen => {
    // add a way to close the panel on a click on the panel header
    dispatch(setExpansionPanelOpen(true))
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expansionPanelOpen} onChange={handleChange} TransitionProps={{ unmountOnExit: true }} className={classes.panel} {...props}>
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