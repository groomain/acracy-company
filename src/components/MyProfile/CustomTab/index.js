import React from 'react';
import Tab from '@material-ui/core/Tab';
import styles from './styles';
import { Link } from "react-scroll/modules";
import clsx from "clsx";

const CustomTab = ({ label, missingInfos, to, setActive, selected, ...props }) => {
  const classes = styles();

  return (
    <Link to={to} smooth={true} spy={true} onSetActive={(to) => { setActive(to) }}>
      <Tab className={classes.underSecondaryTitle} variant="body2" label={label}
        classes={{
          root: clsx(classes.root, { [classes.selected]: selected }),
          wrapper: classes.wrapper,
        }}
        {...props}
      />
    </Link>
  );
};

export default CustomTab;