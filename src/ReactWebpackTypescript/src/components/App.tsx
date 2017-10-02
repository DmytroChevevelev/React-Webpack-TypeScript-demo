import * as React from "react";
import { Switch, Route } from 'react-router-dom';

import { Home } from "./Home";
import { Excel } from "./Excel";
import { Header } from "./Header";
import { Friends } from './Friends';

// todo move to backend
var headers = ["Book", "Author", "Language", "Published", "Sales"];
var data = [
    ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954–1955", "150 million"],
    ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"],
    ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"],
    ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],
    ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754–1791", "100 million"],
    ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"],
    ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"],
];

export class App extends React.Component<null, null> {
    render() {
        return (
            <div className="container">
                <Header />
                <div className="container-fluid">
                    <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
                        <Switch>
                            // HOME PAGE
                            <Route exact path="/" component={Home} />
                            // EXCEL
                            <Route exact path="/excel" render={
                                () => <Excel headers={headers} initialData={data} />
                            } />
                            // FRIENDS
                            <Route exact path="/friends" component={Friends} />
                        </Switch>
                    </main>
                </div>
            </div>
        );
    }
}