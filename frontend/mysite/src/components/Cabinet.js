import React, { Component } from 'react';
import axios from 'axios';
import connect from "react-redux/es/connect/connect";

import {NavLink} from "react-router-dom";
import ElementsGroup from "./ElementsGroup";


class Cabinet extends Component {

    constructor(props){
        super(props);
        this.state={
            groups:[],
            done:false
        };

        document.title = "Cabinet";
        this.getGroups();
    }

    getGroups = ()=>{
        axios.get("http://127.0.0.1:3030/cabinet/get_groups",{
            headers:{
                "Authorization":this.props.token
            }
        }).then(result=>{
            const groups = result.data;
            this.setState({groups:groups,done:true});


        }).catch(error=>{
            console.log(error);
            if (error){
                this.props.LogOut(false,"","","","");
                this.props.history.push("/login");

            }
        })
    };


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-3 bg-light">
                            <NavLink to="/cabinet/create_group" className="btn btn-light"> create group</NavLink>
                        </div>
                    </div>
                    <div className="row">
                        <div className="list-group list-group-flush">
                            {this.state.done? <ElementsGroup groups={this.state.groups}/>:"Loading"}
                        </div>
                    </div>
                </div>

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


export default connect(putStateToProps)(Cabinet);