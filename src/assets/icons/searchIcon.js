import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

const SearchIcon = ({ color, ...props }) => {
  return (
    <SvgIcon {...props} >
      <g fill="none" fillRule="evenodd" stroke={color} strokeLinecap="round" strokeWidth="2" transform="translate(1 1)">
        <circle cx="7.5" cy="7.5" r="7.5" transform="matrix(-1 0 0 1 15 0)" />
        <path d="M17.357 12.75L12.803 16.5" transform="matrix(-1 0 0 1 31.607 0)" />
      </g>
    </SvgIcon>
  )
};

export default SearchIcon;