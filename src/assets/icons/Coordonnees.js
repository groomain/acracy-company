import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

export const CoordonneesIcon = ({ ...props }) => {
  return (
    <SvgIcon {...props} >
      <g fill="none" fillRule="evenodd" stroke={props.hovered ? '#ecf805' : '#FFF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M11.2-1c.492 0 .936.195 1.259.505.336.323.541.772.541 1.264h0v8.462c0 .492-.205.94-.541 1.264-.323.31-.767.505-1.259.505h0H.8c-.492 0-.936-.195-1.259-.505C-.795 10.172-1 9.723-1 9.231h0V.769c0-.492.205-.94.541-1.264C-.136-.805.308-1 .8-1h10.4z" transform="translate(2 4)" />
        <path d="M2.5 2.5L6 5.5 9.5 2.5" transform="translate(2 2)" />
      </g>
    </SvgIcon>
  );
};
