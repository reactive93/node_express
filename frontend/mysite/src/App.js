import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Header from './components/Header'
import {BrowserRouter, Route, Switch,Redirect,Router} from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Cabinet from "./components/Cabinet";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router";
import CreateGroup from "./components/CreateGroup";
import AddToGroup from "./components/AddToGroup";
import Group from "./components/Group";
import SettingGroup from "./components/SettingGroup";

class App extends Component {

    constructor(props){
        super(props);
    }
  render() {
    return (
        <div className="container">
            <Header/>
            <Switch>
                <Route path="/registration" exact component={Registration}/>
                <Route path="/login" component={Login}/>}/>
                <Route path="/cabinet/create_group" exact component={CreateGroup}/>
                <Route path="/cabinet/:creator_id/:link/add_to_group" exact component={AddToGroup}/>
                <Route path="/cabinet/:creator_id/:link/group" exact component={Group}/>
                <Route path="/cabinet/:creator_id/:link/settings" exact component={SettingGroup}/>
                {this.props.isLogged?<Route path="/cabinet" exact component={Cabinet}/>:null}
            </Switch>
        </div>
    );
  }
}

function putStateToProps(state) {
    return {
        isLogged:state.isLogged,
        token:state.token
    }
}

export default withRouter(connect(putStateToProps)(App));
