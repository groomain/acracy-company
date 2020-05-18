import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export const TravailIcon = ({ color, ...props }) => {
  return (
    <SvgIcon {...props} >
      <g fill="none" fillRule="evenodd" stroke="#ECF805" strokeWidth="2" transform="translate(-10 -8)">
        <rect width="18" height="18" x="11" y="11" strokeLinecap="round" rx="9" transform="rotate(90 20 20)" />
        <path strokeLinecap="round" d="M20 20L24.5 16" />
        <path strokeLinejoin="round" d="M24.5 16L24.507 12.894 28.393 9 28.781 11.718 31.5 12.106 27.615 16z" />
      </g>
    </SvgIcon>
  )
};

