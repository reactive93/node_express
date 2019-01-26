import React, { Component } from 'react';
import axios from 'axios';
import connect from "react-redux/es/connect/connect";
import {NavLink,BrowserRouter,Router} from "react-router-dom";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';


class AddToGroup extends Component{

    constructor(props){
        super(props);
        this.state = {
            username:''
        }
    }


    changeUserName(event){
        this.setState({username:event.target.value});
    }

    addUser=()=>{

        axios.post("http://127.0.0.1:3030/cabinet/addUser",{
            creator_id: this.props.creator_id,
            link: this.props.link,
            username: this.state.username,
        },{headers:{"Authorization":this.props.token}}).then(result=>{
            const data = result.data;

        });

    };

    render() {
        return (
            <div className="container">
                <div className="row">Add user to group</div>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" onChange={this.changeUserName.bind(this)}/>
                        <button onClick={this.addUser}>add user</button>
                    </div>
                </div>
            </div>
        )
    }
}
function putStateToProps(state) {
    return {
        isLogged:state.isLogged,
        token:state.token
    }
}

export default connect(putStateToProps)(AddToGroup);