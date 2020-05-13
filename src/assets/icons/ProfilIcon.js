import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

const ProfilIcon = ({ color, ...props }) => {
  return (
    <SvgIcon {...props} >
        <g fill="none" fill-rule="evenodd" stroke-width="2" transform="translate(2 2)">
            <path stroke={props.hovered ? '#ecf805' : '#FFF'} stroke-linejoin="round" d="M26 16c2.761 0 5 2.239 5 5 0 1.267-.471 2.423-1.247 3.304l-.163-.088C32.205 25.569 34 28.355 34 31.57c0 4.545-16 4.545-16 0 0-3.149 1.72-5.885 4.247-7.268C21.47 23.423 21 22.267 21 21c0-2.761 2.239-5 5-5z"/>
        </g>
    </SvgIcon>
  )
};

export default ProfilIcon;
