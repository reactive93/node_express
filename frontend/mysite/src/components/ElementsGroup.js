import React, { Component } from 'react';
import axios from 'axios';
import connect from "react-redux/es/connect/connect";
import {NavLink,BrowserRouter,Router} from "react-router-dom";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';


class ElementsGroup extends Component{

    constructor(props){
        super(props);
        console.log(this.props.groups);
    }

    groups = this.props.groups.groups.map(group=>{
            return (<div className="list-group-item" key={group.id}>
                <div>
                    <NavLink to={`/cabinet/${group.creator_id}/${group.link}/group`}>{group.name}</NavLink>
                </div>
                <div className="row"><NavLink to={`/cabinet/${group.creator_id}/${group.link}/settings`}>settings</NavLink></div>
            </div>)
    }
    );

    render() {
        return (
            <div className="list-group list-group-flush">{this.groups}</div>
        );
    }
}

function putStateToProps(state) {

    return {
        isLogged: state.isLogged,
        token: state.token
    };
}

export default connect(putStateToProps)(ElementsGroup);