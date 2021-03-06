import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

export const MenuIcon = (props) => {
  return (
    <SvgIcon {...props} >
      <g fill="none" fillRule="evenodd">
        <g fill={props.hovered ? '#ecf805' : '#FFF'} transform="translate(9 4)">
          <circle cx="2.5" cy="2.5" r="2.5" />
          <circle cx="2.5" cy="12.5" r="2.5" />
        </g>
      </g>
    </SvgIcon>
  );
};
