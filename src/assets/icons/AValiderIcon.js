import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

export const AValiderIcon  = ({...props}) => {
    return (
        <SvgIcon {...props} >
            <g fill="none" fill-rule="evenodd">
                <g>
                    <path d="M7.6 11L19 0" transform="translate(-10 -15) translate(11 15)"/>
                    <path stroke="#ECF805" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M0 3.667L7.6 11 11.406 7.333" transform="translate(-10 -15) translate(11 15)"/>
                </g>
                <path stroke="#ECF805" stroke-dasharray="0 4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 18.667L18.6 26 30 15" transform="translate(-10 -15)"/>
            </g>
        </SvgIcon>
    );
};
