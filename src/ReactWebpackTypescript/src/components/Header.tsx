import * as React from "react";
import * as ReactDOM from "react-dom";

export class Header extends React.Component<null, null> {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a className="navbar-brand" href="#">React demo</a>
            </nav>
        );
    }
}