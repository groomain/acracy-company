import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

export const AdresseIcon = ({ ...props }) => {
  return (
    <SvgIcon {...props} >
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <path stroke={props.hovered ? '#ecf805' : '#FFF'} strokeLinejoin="round" strokeWidth="2" d="M7.18 14.514C9.725 10.578 11 7.705 11 5.896 11 2.64 8.538 0 5.5 0S0 2.64 0 5.896c0 1.81 1.274 4.682 3.82 8.618h0c.601.927 1.84 1.192 2.767.592.237-.153.439-.355.592-.592z" />
        <circle cx="5.5" cy="5.5" r="1.5" fill={props.hovered ? '#ecf805' : '#FFF'} />
      </g>
    </SvgIcon>
  );
};
