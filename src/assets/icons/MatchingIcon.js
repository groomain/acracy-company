import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

export const MatchingIcon  = ({...props}) => {
    return (
        <SvgIcon {...props} >
            <g fill="none" fill-rule="evenodd" stroke="#ECF805" stroke-linecap="round" stroke-width="2">
                <path d="M3 6.015V10c0 3.866 3.134 7 7 7" transform="translate(1 1)"/>
                <path d="M1 6L1 10 5 10" transform="translate(1 1) rotate(135 3 8)"/>
                <path d="M17.015 10.992V7.008c0-3.866-3.134-7-7-7" transform="translate(1 1)"/>
                <path d="M15.015 7.008L15.015 11.008 19.015 11.008" transform="translate(1 1) rotate(-45 17.015 9.008)"/>
            </g>
        </SvgIcon>
    );
};
