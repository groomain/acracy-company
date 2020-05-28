import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

export const ContactIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(-4 -4) translate(5 4)">
                    <rect width="9.6" height="17.6" x="4" y="1.6" stroke={props.hovered ? '#ecf805' : '#FFF'} stroke-width="2" rx="1.6" transform="rotate(-30 8.8 10.4)"/>
                    <circle cx="11.6" cy="14.8" r="1.2" fill={props.hovered ? '#ecf805' : '#FFF'} transform="rotate(-30 11.6 14.8)"/>
                </g>
            </g>
        </SvgIcon>
    );
};
