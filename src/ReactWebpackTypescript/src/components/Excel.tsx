import * as React from "react";
import * as ReactDOM from "react-dom";

export interface ExcelProps {
    headers:
    string[],
    initialData: string[][]
};

export interface ExcelState {
    data: string[][],
    sortBy: number,
    descending: boolean,
    edit: {
        row: number,
        cell: number
    }
};

export class Excel extends React.Component<ExcelProps, ExcelState> {

    constructor(props: ExcelProps) {
        // set props
        super(props);
        // set state
        this.state = {
            data: props.initialData,
            sortBy: null,
            descending: false,
            edit: null
        };
        // bind this on events
        this._sort = this._sort.bind(this);
        this._save = this._save.bind(this);
        this._showEditor = this._showEditor.bind(this);
    }

    // sort by column
    _sort(e: React.SyntheticEvent<HTMLTableSectionElement>): void {
        const currentState = this.state;
        let data = currentState.data.slice();
        let column = (e.target as HTMLTableCellElement).cellIndex;
        let descending = currentState.sortBy === column && !currentState.descending;

        data.sort((a, b) => {
            let lessOrBigger = descending
                ? (a[column] < b[column])
                : (a[column] > b[column]);

            return lessOrBigger ? 1 : -1;
        });
        
        this.setState({
            data: data,
            sortBy: column,
            descending: descending
        });
    }

    _showEditor(row: number, cell: number): void {
        this.setState({
            edit: {
                row: row,
                cell: cell
            }
        });
    }

    renderTableHeader() {
        return (
            <thead onClick={this._sort}>
                <tr>
                    {
                        this.props.headers.map((title: string, idx: number) => {
                            return this.state.sortBy == idx
                                ? <th key={idx}>{title} {this.state.descending ? '\u2191' : '\u2193'}</th>
                                : <th key={idx}>{title}</th>;
                        })
                    }
                </tr>
            </thead>
        );
    }

    _save(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const currentState = this.state;
        var data = currentState.data.slice();
        let input = e.currentTarget.elements[0] as HTMLInputElement;
        data[currentState.edit.row][currentState.edit.cell] = input.value;

        this.setState({
            data: data,
            edit: null
        });
    }

    renderTableBody() {
        return (
            <tbody>
                {
                    this.state.data.map((row: string[], rowIdx: number) => {
                        return (
                            <tr key={rowIdx}>
                                {
                                    row.map((cell: string, cellIdx: number) => {
                                        let content = cell;
                                        let edit = this.state.edit;

                                        if (edit != null && edit.row === rowIdx && edit.cell === cellIdx) {
                                            return (
                                                <td key={cellIdx}>
                                                    <form onSubmit={this._save}>
                                                        <input defaultValue={content} type="text" />
                                                    </form>
                                                </td>
                                                );
                                        }

                                        return <td key={cellIdx} data-row={cellIdx} onDoubleClick={() => this._showEditor(rowIdx, cellIdx)}>{cell}</td>;
                                    })
                                }
                            </tr>
                        );
                    })
                }
            </tbody>
        );
    }

    render() {
        return (
            <table>
                {this.renderTableHeader()}
                {this.renderTableBody()}
            </table>);
    }
}