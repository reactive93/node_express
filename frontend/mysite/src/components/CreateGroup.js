import React, { Component } from 'react';
import axios from 'axios';
import connect from "react-redux/es/connect/connect";

import 'bootstrap/dist/css/bootstrap.min.css';

class CreateGroup extends Component{

    constructor(props){
        document.title = "Create group";
        super(props);
        this.state = {
            name:"",
            error:false,
            error_text:""
        }
    }

    getError(){
        return (
            <div className="alert alert-danger" role="alert">
                {this.state.error_text}
            </div>
        );
    }

    groupNameChange = (event)=>{
        this.setState({name:event.target.value});
    };

    createGroup = ()=>{
        axios.post("http://127.0.0.1:3030/cabinet/create_group",{group_name: this.state.name},{
         headers:{
             "Authorization":this.props.token,
         }
        }).then((result)=>{

            if (result.hasOwnProperty("text")){
                console.log(result);
                this.props.history.push("/cabinet");
            }
            else {
                console.log(result);
                this.setState({error:true});
                this.setState({error_text: result.data.error})
            }
        });
    };

    render() {
        return (

            <div className="container">
                {this.state.error ? this.getError(): null}
                <div className="row">
                    <div className="col-3 bg-light">
                        <div className="form-group">
                            <label htmlFor="group_name">Group name</label>
                            <input type="text" className="form-control" id="group_name" name="group_name"
                                   placeholder="Group name"
                                   value={this.state.name} onChange={this.groupNameChange.bind(this)}/>
                            <div className="p-2">
                                <button className="btn btn-light" onClick={this.createGroup.bind(this)}>create group</button>
                            </div>
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
export default connect(putStateToProps)(CreateGroup);