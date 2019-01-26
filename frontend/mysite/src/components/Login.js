import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {Loggin} from "../redux/actions";
class Login extends Component {


    constructor(props) {
        console.log(props);
        super(props);
        this.state={
            login:'',
            password:'',
            error:false,
            isLogged: false,
        };
        this.sendLogin.bind(this);

    }


    sendLogin = (event)=>{
        event.preventDefault();
        const encode = window.btoa(this.state.login+":"+this.state.password);
        console.log(encode);
        axios.post(
            'http://127.0.0.1:3030/login', // url
            null,
            {
                headers: {
                    'Authorization':'Basic '+encode,
                },
            } // config
        )
            .then( (response)=> {
                const token = response.data;
                if(response.data.hasOwnProperty("token")){

                    this.props.Logging(true, token.token, this.state.login, token.id);
                    console.log(token.id);
                    this.props.history.push('/cabinet');
                }
                else {
                    this.setState({error:true});
                }

            })
            .catch((error)=> {
                console.log('its not ok');
                console.log(error);
                this.props.Logging(false);
            });

    };

    loginChange = function(event){
        this.setState({login: event.target.value});
        console.log(this.state.login);
    };

    passwordChange = function(event){

        this.setState({password:event.target.value})
    };
    getError(){
        return (
            <div className="alert alert-danger" role="alert">Invalid login or
                password
            </div>
        );
    }
    render() {
        return (

            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-4"></div>
                    <div className="col">
                        <form onSubmit={this.sendLogin}>
                            {this.state.error==true?this.getError():null}
                            <div className="form-group">
                                <label htmlFor="login">Login</label>
                                <input type="text" className="form-control" id="login" name="login"
                                       aria-describedby="loginHelp" placeholder="Enter login" value={this.state.login} onChange={this.loginChange.bind(this)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" name="password"
                                       id="exampleInputPassword1"
                                       placeholder="Password" value={this.state.password} onChange={this.passwordChange.bind(this)}/>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>

        );
    }
}

function putStateToProps(state) {
    return {
        isLogged:state.isLogged,
        token:state.token,
        id: state.id
    }
}

function putActionsToProps(dispatch) {
    return {
        Logging:bindActionCreators(Loggin, dispatch)
    }
}

export default connect(putStateToProps, putActionsToProps)(Login);