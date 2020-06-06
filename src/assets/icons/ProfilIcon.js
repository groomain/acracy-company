import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

const ProfilIcon = ({ color, ...props }) => {
  return (
    <SvgIcon {...props} >
        <path fill="none" fill-rule="evenodd" stroke={props.hovered ? '#ecf805' : '#FFF'} stroke-linejoin="round" stroke-width="2" d="M7.4 1c2.21 0 4 1.79 4 4 0 1.013-.377 1.938-.997 2.643l-.133-.071c2.094 1.082 3.53 3.311 3.53 5.885 0 3.636-12.8 3.636-12.8 0 0-2.52 1.376-4.709 3.398-5.815C3.777 6.938 3.4 6.012 3.4 5c0-2.21 1.79-4 4-4z"/>
    </SvgIcon>
  )
};

export default ProfilIcon;
