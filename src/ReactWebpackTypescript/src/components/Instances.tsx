// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as $ from "jquery";
import * as u from './Utils';
import * as dropDown from './DropDown';
import * as c from './Common';

export interface InstancesState {
    instances: any[],
    geos: any[],
    selectedGeo: string
}

export class Instances extends React.Component<c.CommonProps, InstancesState> {
    geos: any[] = [];
    utils: u.Utils = new u.Utils();
    constructor(props: c.CommonProps) {
        super(props);
        
        this.state = {
            instances: [],
            geos: [],
            selectedGeo: 'NAM'
        };
        this.loadGeos();
        
    }

    onError = (error: any) => {
        this.props.infoBar.show({ text: error, type: c.MessageTypes.error });
        this.props.isBusy(false);
    }

    loadGeos() {
        this.props.isBusy(true);
        this.utils.executeWebApi('http://localhost:8085/api/dseAction/geos', u.httpRequestTypes.GET, '', this.props.auth.token(), {}).then((data: any[]) => {
            this.geos = [];
            var currentState = this.state;
            data.map((item: string) => {
                this.geos.push(
                    {
                        geo: item,
                        isSelected: item === 'NAM'
                    });
            });

            this.setState({
                geos: this.geos
            });
            this.props.isBusy(false);
            this.loadInstances('NAM');
        }, this.onError);
    }

    loadInstances(geo: string) {
        this.props.isBusy(true);
        this.utils.executeWebApi('http://localhost:8085/api/deploymentInstances?geo=' + geo, u.httpRequestTypes.GET, '',
            this.props.auth.token(), {}).then((data: any) => {
                this.setState({ instances: data });
                this.props.isBusy(false);
            }, this.onError);
    }
    onGeoChanged = (e: dropDown.DropDownEvent) => {
        this.setState({
            selectedGeo: e.value
        });

        this.loadInstances(e.value);
    }
    render() {
        return (
            <div>
                <div className="ms-dse-toolbar">
                    <dropDown.DropDown options={this.state.geos} displayMember="geo" onSelectionChanged={this.onGeoChanged} />
                </div>
                <table className="ms-dse-table">
                    <thead>
                        <tr>
                            <th>Organization</th>
                            <th>TenantId</th>
                            <th>TenantProductId</th>
                            <th>RsoVersion</th>
                            <th>CrmVersion</th>
                            <th>LastServiceBusRolloverDate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.instances.map((row: any, rowIdx: number) => {
                                return (
                                    <tr key={rowIdx}>
                                        <td>{row.OrganizationName}</td>
                                        <td>{row.TenantId}</td>
                                        <td>{row.TenantProductId}</td>
                                        <td>{row.RsoVersion}</td>
                                        <td>{row.CrmVersion}</td>
                                        <td>{row.LastServiceBusRolloverDate}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}