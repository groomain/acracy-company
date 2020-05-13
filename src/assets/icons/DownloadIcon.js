import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

export const DownloadIcon  = (props) => {
    return (
        <SvgIcon {...props}>
            <g fill="none" fill-rule="evenodd" stroke={props.hovered ? '#ecf805' : '#FFF'} stroke-linecap="round" stroke-width="2">
                <path d="M12.015 11.008L12.015 15.008 16.015 15.008" transform="translate(-8 -5) rotate(-45 14.015 13.008)"/>
                <path d="M19 21L9 21M14 6L14 14" transform="translate(-8 -5)"/>
            </g>
        </SvgIcon>
    );
};
