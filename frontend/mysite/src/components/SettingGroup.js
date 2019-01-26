import React, { Component } from 'react';
import axios from 'axios';
import connect from "react-redux/es/connect/connect";
import {NavLink,BrowserRouter,Router} from "react-router-dom";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToGroup from "../components/AddToGroup";

class SettingGroup extends Component{


    remove_group(){
        const creator_id = this.props.match.params.creator_id;
        const link = this.props.match.params.link;
        console.log(this.props);
        axios.post("http://127.0.0.1:3030/cabinet/remove_group",{creator_id:creator_id, link:link, user_login:this.props.login, user_id:this.props.id},{
            headers:{
                "Authorization":this.props.token
            }
        }).then((data)=>{

            if(data.hasOwnProperty("error")){

            }else {
                this.props.history.push("/cabinet");
            }

        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">{this.props.match.params.creator_id==this.props.id?<AddToGroup creator_id={this.props.match.params.creator_id} link={this.props.match.params.link}/>:null}</div>

                <div className="row"> <button onClick={this.remove_group.bind(this)}>remove group</button></div>

            </div>
        );
    }

}

function putStateToProps(state) {

    return {
        isLogged: state.isLogged,
        token: state.token,
        id: state.id
    };
}
export default connect(putStateToProps)(SettingGroup)