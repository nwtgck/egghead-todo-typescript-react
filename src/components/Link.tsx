import * as React  from "react";
import {ReactNode} from "react";

export const Link = ({active, onClick, children} : {active: boolean, onClick: () => void, children?: ReactNode}) => { // (ReactNode from: https://github.com/Microsoft/TypeScript/issues/6471)
    if (active) {
        return <span>{children}</span>
    } else {
        return (
            <a href="#" onClick={e => {
                e.preventDefault();
                onClick();
            }}>{children}</a>
        );
    }
};