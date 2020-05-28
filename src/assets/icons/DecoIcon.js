import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

export const DecoIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <g fill="none" fill-rule="evenodd">
                <g stroke={props.hovered ? '#ecf805' : '#FFF'} stroke-linecap="round" stroke-width="2">
                    <path d="M1.015 1.008L1.015 5.008 5.015 5.008" transform="translate(-5 -6) translate(6 7) scale(-1 1) rotate(45 -10.334 -15.537)"/>
                    <path d="M11 3L11 11" transform="translate(-5 -6) translate(6 7) matrix(0 1 1 0 4 -4)"/>
                    <path stroke-linejoin="round" d="M11 2.5V1c0-.552-.448-1-1-1H1C.448 0 0 .448 0 1v13c0 .552.448 1 1 1h9c.552 0 1-.448 1-1v-1.5" transform="translate(-5 -6) translate(6 7)"/>
                </g>
            </g>
        </SvgIcon>
    );
};
