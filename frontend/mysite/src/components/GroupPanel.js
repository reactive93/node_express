import React, { Component } from 'react';
import axios from 'axios';
import connect from "react-redux/es/connect/connect";
import {NavLink,BrowserRouter,Router} from "react-router-dom";
import ElementGroup from "./ElementsGroup";
import 'bootstrap/dist/css/bootstrap.min.css';


class GroupPanel extends Component{
    constructor(props){
        super(props);
        this.state= {
            groups:[],
            done:false
        }
    }



    render() {
        return (
            <div></div>
        );
    }
}

function putStateToProps(state) {
    return {
        isLogged:state.isLogged,
        token:state.token
    }
}
export default connect(putStateToProps)(GroupPanel);