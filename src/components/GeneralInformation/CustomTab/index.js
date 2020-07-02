import React from 'react';
import Tab from '@material-ui/core/Tab';
import styles from './style';
import retard from '../../../assets/icons/retard2.svg';
import chevronOk from '../../../assets/icons/small-check-copy-2.svg';
import {Link} from "react-scroll/modules";

const CustomTab = ({ label, missingInfos, to, setActive, ...props }) => {
  const classes = styles();

    const getIcon = (isOk) => {
    if (isOk) {
      return <img alt="chevronOK" src={chevronOk} style={{ position: 'absolute', right: -5 }}/>
    } else if (isOk === false) {
      return <img alt="retard" src={retard} style={{ position: 'absolute', right: -5 }}/>
    }
  };

  return (
      <Link to={to} smooth={true} spy={true} onSetActive={(to) => {setActive(to)}}>
      <Tab className={classes.underSecondaryTitle} variant="body2" label={label} icon={getIcon(missingInfos)}
           classes={{
             root: classes.root,
             wrapper: classes.wrapper,
             selected: classes.selected
           }}
           onClick={() => console.log('test')}
           {...props}
      />
      </Link>
  );
};

export default CustomTab;
