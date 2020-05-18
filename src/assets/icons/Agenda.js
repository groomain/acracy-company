import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

export const Agenda = ({ ...props }) => {
  return (
    <SvgIcon {...props} >
      <g fill="none" fillRule="evenodd" stroke="#FFF" strokeWidth="2">
        <path d="M15 2H1c-.552 0-1.052.224-1.414.586C-.776 2.948-1 3.448-1 4v14c0 .552.224 1.052.586 1.414C-.052 19.776.448 20 1 20h14c.552 0 1.052-.224 1.414-.586.362-.362.586-.862.586-1.414V4c0-.552-.224-1.052-.586-1.414C16.052 2.224 15.552 2 15 2z" transform="translate(2 1)" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 13L9 15 12 12" transform="translate(2 1)" />
        <path strokeLinecap="round" d="M3.5 4L3.5 0M12.5 4L12.5 0" transform="translate(2 1)" />
      </g>
    </SvgIcon>
  );
};
