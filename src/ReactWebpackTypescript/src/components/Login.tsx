// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { Dashboard } from './Dashboard';
import { CommonProps } from "./Common";

require('style-loader!css-loader!./../../css/App.css');

export class Login extends React.Component<CommonProps, {}> {
    constructor(props: CommonProps) {
        super(props);
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logOut();
    }

    render() {
        if (this.props.auth.token()) {
            return (
                <Dashboard {...this.props} />
            );
        }
        return (
            <div className="ms-rso-page ms-rso-signin-box">
                <div className="ms-rso-signin-box-content">
                    <span className="ms-rso-signin-span">To continue, click Sign In.</span>
                    <input type="button" className="ms-rso-signin-button" value="Sign in" onClick={() => this.login()} />
                </div>
            </div>
        );
    }
}