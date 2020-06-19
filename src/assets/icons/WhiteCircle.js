import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export const WhiteCircle = ({ color, ...props }) => {
  return (
    <SvgIcon {...props} >
      <circle cx="9" cy="9" r="9" fill="none" fillRule="evenodd" stroke="#FFF" strokeWidth="2" transform="translate(5 1)" />
    </SvgIcon>
  )
};

