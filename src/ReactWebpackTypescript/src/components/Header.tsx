import * as React from "react";
import { Link, NavLink } from 'react-router-dom';

export class Header extends React.Component<null, null> {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <Link className="navbar-brand" to='/'>React demo</Link>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/' exact activeClassName="active">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/excel' exact activeClassName="active">Excel</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/friends' exact activeClassName="active">Friends</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}