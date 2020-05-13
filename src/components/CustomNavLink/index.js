import React from 'react';
import styles from './styles';
import { NavLink } from "react-router-dom";

export const CustomNavLink = ({ to, text, theme, ...props }) => {
  const classes = styles();
  return (
    <NavLink className={classes[theme]} to={to}>{text}</NavLink>
  );
};

export default CustomNavLink;
