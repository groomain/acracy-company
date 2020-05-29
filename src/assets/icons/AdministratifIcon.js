import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

export const AdministratifIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <g fill="none" fill-rule="evenodd" stroke={props.hovered ? '#ecf805' : '#FFF'} stroke-width="2">
                <path d="M8 7H20V21H8zM11 11.5L17 11.5" transform="translate(-7 -6)"/>
            </g>
        </SvgIcon>
    );
};
