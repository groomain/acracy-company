import React from "react";

export const FactureIcon = (props) => {
    return (
        <svg  xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 84 84">
            <g fill="none" fill-rule="evenodd">
                <path fill="#212A21" d="M12 10h50c6.627 0 12 5.373 12 12v50c0 6.627-5.373 12-12 12H12C5.373 84 0 78.627 0 72V22c0-6.627 5.373-12 12-12z"/>
                <text fill="#FFF" font-family="BasierCircle-Regular, Basier Circle" font-size="14" letter-spacing="-.368">
                    <tspan x="8.516" y="74">Facture.s</tspan>
                </text>
                <g stroke="#FFF" stroke-width="2">
                    <path d="M9.076 7.276l.011-5.48C9.09.804 9.903 0 10.905 0h7.277C19.186 0 20 .806 20 1.8v23.4c0 .994-.814 1.8-1.818 1.8H1.818C.814 27 0 26.194 0 25.2V10.818c0-.964.765-1.75 1.727-1.798l.11-.002h0l5.403.054c.974.01 1.776-.74 1.833-1.692l.003-.104h0z" transform="translate(27 30)"/>
                    <path d="M9.89 0h8.292C19.186 0 20 .806 20 1.8v23.4c0 .994-.814 1.8-1.818 1.8H1.818C.814 27 0 26.194 0 25.2V10.492c0-.451.171-.886.48-1.218L8.55.582C8.896.21 9.38 0 9.89 0z" transform="translate(27 30)"/>
                </g>
                {props.number &&
                <g transform="translate(56)">
                    <rect width="28" height="28" fill="#ECF805" rx="14"/>
                    <text fill="#162217" font-family="BasierCircle-Bold, Basier Circle" font-size="14"
                          font-weight="bold" letter-spacing="-.368">
                        <tspan x="10.201" y="20">{props.number}</tspan>
                    </text>
                </g>
                }
            </g>
        </svg>
    );
};
