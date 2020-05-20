import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

export const DemarreIcon = (props) => {
  return (
    <SvgIcon {...props} >
      <g fill="none" fill-rule="evenodd" >
        <g stroke="#ECF805" strokeWidth="2" transform="translate(-8 -15) translate(8 15)">
          <circle cx="5" cy="5" r="4" />
          <circle cx="5" cy="5" r="1" />
          <circle cx="20" cy="5" r="4" />
          <path strokeLinecap="square" d="M9 5L16 5" />
        </g>
      </g>
    </SvgIcon>
  );
};
