import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink,BrowserRouter,Router} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {Loggin,LogOut} from "../redux/actions";

class Header extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Online Board</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/features" className="nav-link" href="#">Features</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/pricing" className="nav-link" href="#">Pricing</NavLink>
                        </li>
                        {this.props.isLogged?(<li className="nav-item">
                            <NavLink to="/cabinet" className="nav-link" href="#">Cabinet</NavLink>
                        </li>):null}
                    </ul>
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <div className="nav-link">{this.props.login}</div>
                    <div className="mr-sm-2 nav-link">
                        {this.props.isLogged?<button className="btn btn-primary mr-2" onClick={()=>this.props.LogOut(false,"","","")}>Logout</button>:<NavLink to="/login" className="btn btn-primary mr-2">Login</NavLink>}
                        <NavLink to="/registration" className="btn btn-light">Registration</NavLink>
                    </div>
                </div>
            </nav>

        );
    }
}

function mapStateToProps(state) {
    return {
        isLogged: state.isLogged,
        token: state.token,
        login: state.login
    }

}

function putActionsToProps(dispatch) {
    return {
        LogOut:bindActionCreators(LogOut, dispatch)
    }
}

export default connect(mapStateToProps, putActionsToProps)(Header);