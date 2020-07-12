import React from 'react';
import Tab from '@material-ui/core/Tab';
import styles from './styles';
import { Link } from "react-scroll/modules";

const CustomTab = ({ label, missingInfos, to, setActive, ...props }) => {
  const classes = styles();

  return (
    <Link to={to} smooth={true} spy={true} onSetActive={(to) => { setActive(to) }}>
      <Tab className={classes.underSecondaryTitle} variant="body2" label={label}
        classes={{
          root: classes.root,
          wrapper: classes.wrapper,
          selected: classes.selected
        }}
        {...props}
      />
    </Link>
  );
};

export default CustomTab;