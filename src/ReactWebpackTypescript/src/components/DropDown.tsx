// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';

export interface DropDownEvent {
    value: any
}

export interface DropdownItem{
    isSelected: boolean
}

export interface DropDownProps {
    options: DropdownItem[],
    displayMember: string,
    onSelectionChanged(ev: DropDownEvent): void
}

export interface DropDownState {
    value: any
}

export class DropDown extends React.Component<DropDownProps, DropDownState> {
    constructor(props: DropDownProps) {
        super(props);
        var selected = {};
                
        for (let i = 0; i < this.props.options.length; i++) {
            if (props.options[i].isSelected) {
                selected = props.options[i].isSelected;
                break;
            }
        }

        this.state = { value: selected };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (event: any){
        this.setState({ value: event.target.value });
        this.props.onSelectionChanged({ value: event.target.value });
    }

    render() {
        return (
            <select value={this.state.value} onChange={this.handleChange}>
                {   
                    this.props.options.map((row: any, rowIdx: number) => {
                        return (
                            <option key={rowIdx} value={row[this.props.displayMember]}>{row[this.props.displayMember]}</option>
                        );
                    })  
                }
            </select>
            );
    }
}