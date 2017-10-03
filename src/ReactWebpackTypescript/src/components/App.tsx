// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { AuthHelper } from './AuthHelper';
import { Login } from './Login';
import * as common from './Common';

require('style-loader!css-loader!./../../css/App.css');
const logo = require('url-loader?mimetype=image/png!./../../Img/Microsoft-logo_rgb_c-gray.png');
const progress = require('url-loader?mimetype=image/png!./../../Img/progress.gif');


export class App extends React.Component<{}, common.AppState> {
    authHelper: AuthHelper;
    infoBar: common.InfoBar;
    constructor() {
        super();
        this.authHelper = new AuthHelper();
        this.state = {
            isBisy: false
        };
        this.infoBar = {
            show: this.showInfo.bind(this)
        };        
    }

    hideInfo() {
        this.setState({
            message: null
        });
    }

    showInfo(message?: common.Message, duration?: number) {
        var state = {};
        
        if (!message) {
            this.hideInfo();
            return;
        }

        if (message.type == common.MessageTypes.error) {
            state = {
                message: message,
                messageStyle: common.errorStyle,
                messageTextStyle: common.infoTextStyle
            };
        }

        if (message.type == common.MessageTypes.wait) {
            state = {
                message: message,
                messageStyle: common.waitStyle,
                messageTextStyle: common.infoTextStyle
            };
        }

        if (message.type == common.MessageTypes.info) {
            state = {
                message: message,
                messageStyle: common.infoStyle,
                messageTextStyle: common.infoTextStyle
            };
        }

        this.setState(state);

        if (duration) {
            setTimeout(() => { this.hideInfo(); }, duration);
        }
    }

    isBusy = (mode: boolean) => {
        this.setState(prevState => ({
            isBisy: mode,
            message: prevState.message,
            messageStyle: prevState.messageStyle,
            messageTextStyle: prevState.messageTextStyle
        }));
    }
    
    logOut() {
        this.authHelper.logOut();
    }

    renderInfoBar() {
        if (this.state.message) {
            return (
                <div style={this.state.messageStyle}>
                    <div className="ms-are-info-body">
                        <div className="ms-are-info-group">
                            <span className="ms-are-info-create-title" style={this.state.messageTextStyle} >{this.state.message.text}</span>
                        </div>
                    </div>
                </div>
            );
        }
    }

    renderBlocker() {
        if (this.state.isBisy) {
            return (<div>
                <div className="ms-dse-uiblocker"></div>
                <div>
                    <img className="center" src={progress} alt="logo" />
                </div>
            </div>);
        }        
    }

    render() {
        const props = {
            auth: new AuthHelper(),
            infoBar: this.infoBar,
            isBusy: this.isBusy
        };
        return (
            <div>
                <div className="ms-rso-header" >
                    <div className="title">Dynamics 365</div>
                    <div className="login">
                        <span className="loginUser" onClick={() => this.logOut()}>{this.authHelper.getName()}</span>
                        <span className="sign-menu-arrow" />
                    </div>
                </div>
                {this.renderInfoBar()}
                <Login {...props} />
                <div className="ms-rso-footer">
                    <img src={logo} className="msft-logo" alt="logo" />
                </div>
                {this.renderBlocker()}              
            </div>
        );
    }
}

