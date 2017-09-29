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
    },
    search: string[]
};

export class Excel extends React.Component<ExcelProps, ExcelState> {

    _preSearchData: string[][] = null;

    constructor(props: ExcelProps) {
        // set props
        super(props);
        // set state
        this.state = {
            data: props.initialData,
            sortBy: null,
            descending: false,
            edit: null,
            search: null
        };
        // bind this on events
        this._sort = this._sort.bind(this);
        this._save = this._save.bind(this);
        this._toggleSearch = this._toggleSearch.bind(this);
        this._search = this._search.bind(this);
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

    _save(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const currentState = this.state;
        let data = currentState.data.slice();
        let input = e.currentTarget.elements[0] as HTMLInputElement;
        data[currentState.edit.row][currentState.edit.cell] = input.value;

        this.setState({
            data: data,
            edit: null
        });
    }

    _toggleSearch() {
        if (this.state.search) {
            this.setState({
                data: this._preSearchData,
                search: null
            });
        }
        else {
            this._preSearchData = this.state.data;
            this.setState({
                search: new Array<string>(this.props.headers.length)
            });
        }
    }

    _download(type: string, e: any) {
        let content = type == "json"
            ? JSON.stringify(this.state.data)
            : this.state.data.reduce(function (result, row) {
                return result +
                    row.reduce(function (rowResult, cell, idx) {
                        return rowResult + "'" + cell.replace(/"/g, '""') + "'" + (idx < row.length ? "," : "");
                }, "") + "\n";
            }, "");

        let URL = window.URL;
        let blob = new Blob([content], {
            type: 'text/' + type
        });
        e.target.href = URL.createObjectURL(blob);
        e.target.download = 'data.' + type;
    }

    _search(e: React.SyntheticEvent<HTMLTableDataCellElement>) {
        let input = e.target as HTMLInputElement;
        let idx = parseInt(input.dataset.idx);

        let search = this.state.search;
        search[idx] = input.value.toLowerCase();

        let searchData = this._preSearchData.filter((row) => {
            let result = true;

            this.state.search.map((_, idx) => {
                if (row[idx].toString() !== "") {
                    result = result && row[idx].toString().toLowerCase().indexOf(search[idx]) > -1;
                }
            });

            return result;
        });

        this.setState({
            data: searchData
        });


        this.setState({
            search: search
        });
    }

    renderSearch() {
        if (!this.state.search) {
            return null;
        }

        return (
            <tr>
                {this.props.headers.map((_: string, idx: number) => {
                    return (
                        <td key={idx} onChange={this._search}>
                            <input className="form-control mr-sm-2" type="text" data-idx={idx} />
                        </td>
                    );
                })}
            </tr>
        );
    }

    renderTableHeader() {
        return (
            <thead onClick={this._sort}>
                <tr>
                    {
                        this.props.headers.map((title: string, idx: number) => {
                            return this.state.sortBy == idx
                                ? <th key={idx}>{title} {this.state.descending ? '\u2191' : '\u2193'}</th>
                                : <th key={idx}>{title} &nbsp;</th>;
                        })
                    }
                </tr>
                {this.renderSearch()}
            </thead>
        );
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
                                                        <input className="form-control mr-sm-2" defaultValue={content} type="text" />
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
            <div className="container-fluid">
                <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
                    <h1>Improvised Excel</h1>
                    <button className="btn btn-primary" onClick={this._toggleSearch}>Search</button>
                    <table className="table table-striped">
                        {this.renderTableHeader()}
                        {this.renderTableBody()}
                    </table>
                    <div>
                        <a className="btn btn-secondary" href="data.json" onClick={this._download.bind(this, "json")}>Export json</a>
                        {" "}
                        <a className="btn btn-secondary" href="data.csv" onClick={this._download.bind(this, "csv")}>Export csv</a>
                    </div>
                </main>
            </div>);
    }
}