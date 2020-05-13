import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import styles from './styles';

const CustomExpansionPanel = ({ isTag, panelTitle, panelText, ...props }) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={classes.panel} {...props}>
        <ExpansionPanelSummary
          className={classes.header}
          expandIcon={
            isTag
              ? (<ExpandMoreIcon className={classes.arrowIcon} />)
              : (<AddIcon className={classes.addIcon} />)}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4">{panelTitle}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {panelText}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default CustomExpansionPanel;