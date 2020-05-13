import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

export const CloseIcon  = (props) => {
    return (
        <SvgIcon {...props} >
            <g fill="none" fill-rule="evenodd" stroke={props.hovered ? '#ecf805' : '#FFF'} stroke-linecap="round" stroke-width="2">
                <path d="M29.913 22L21.295 30.395" transform="translate(-20 -21) matrix(-1 0 0 1 51 0)"/>
                <path d="M30.208 22L21.503 30.395" transform="translate(-20 -21)"/>
            </g>
        </SvgIcon>
    );
};
