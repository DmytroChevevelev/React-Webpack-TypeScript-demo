// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { Instances } from './Instances';
import { AuthHelper } from './AuthHelper';
import * as u from './Utils';
import * as c from "./Common";


export interface DashboardState {
    mode: string    
}

export class Dashboard extends React.Component<c.CommonProps, DashboardState> {
    mode: string;
    title: string;    
    utils: u.Utils = new u.Utils();
    authHelper: AuthHelper = new AuthHelper();
    constructor(props: c.CommonProps) {
        super(props);
        this.title = 'Manage Resource Scheduling Optimization instances';
        this.state = { mode: '' };
    }

    toggleMode(arg: string) {
        this.setState({
            mode: arg
        });
    }

    renderBody() {
        let currentState = this.state;
        if (currentState.mode === 'versions') {
            return (<div>Versions</div>);
        }
        if (currentState.mode === 'sqlServers') {
            return (<div>Sql Servers</div>);
        }
        return (<Instances {...this.props} />);
    }
    
    render() {
        return (
            <div className="ms-dse-container">
                <h3 className="text-head">{this.title}</h3>
                <div className="text-common">
                    <div className="ms-dse-toolbar">
                        <div id="leftContainer" className="ms-dse-toolbar-item text-common">                            
                        </div>
                        <div id="rightContainer" className="ms-dse-toolbar-item-ra text-common">
                            <input type="button" value="Manage RSO Instances"
                                onClick={() => this.toggleMode('instances')} />
                            <input type="button" className="ms-dse-toolbar-item-ra text-common" value="Manage RSO SQL Server Instances"
                                onClick={() => this.toggleMode('sqlServers')} />
                            <input type="button" className="ms-dse-toolbar-item-ra text-common" value="Manage RSO Versions"
                                onClick={() => this.toggleMode('versions')} />
                            <input type="button" className="ms-dse-toolbar-item-ra text-common" value="Show message"
                                onClick={() => this.props.infoBar.show({ text: 'Text from Dashboard', type: c.MessageTypes.error }, 3000)} />
                            <input type="button" className="ms-dse-toolbar-item-ra text-common" value="hide message"
                                onClick={() => this.props.infoBar.show()} />
                        </div>                        
                    </div>                    
                    {this.renderBody()}
                </div>
            </div>
        );
    }
}