import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

export const IncidentIcon  = (props) => {
    return (
        <SvgIcon {...props} >
            <g fill="none" fill-rule="evenodd">
                <path stroke={props.hovered ? '#ecf805' : '#FFF'} stroke-linejoin="round" stroke-width="2" d="M14 7L20 19 8 19z" transform="translate(-7 -6)"/>
            </g>
        </SvgIcon>
    );
};
