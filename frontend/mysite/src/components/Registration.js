import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import axios from 'axios';

class Registration extends Component{

    constructor(props){
        super(props);
        this.state={
            firstName:'',
            secondName:'',
            login:'',
            password:'',
            confirmPassword: "",
            email:'',
            errorText:'',
            error:false,
        };
        this.form={
            firstName:'',
            secondName:'',
            login:'',
            password:'',
            email:'',
        }

    }

    loginChange=(event)=>{
        this.setState({login:event.target.value});
    };
    firsNameChange=(event)=>{
        this.setState({firstName:event.target.value});
    };
    secondNameChange=(event)=>{
        this.setState({secondName:event.target.value});
    };
    emailChange=(event)=>{
        this.setState({email:event.target.value});
    };
    passwordChange=(event)=>{
        this.setState({password: event.target.value},()=>{
            if(this.state.confirmPassword !== this.state.password){
                this.setState({error:true,errorText:"password dont equals"});

            }
            else {
                console.log(this.state);
                this.setState({error:false});
            }
        });
    };

    confirmPasswordChange = (event)=>{
        this.setState({confirmPassword:event.target.value},()=>{

            if(this.state.confirmPassword !== this.state.password){
                this.setState({error:true,errorText:"password dont equals"});

            }
            else {
                console.log(this.state);
                this.setState({error:false});
            }



        });
    };

    getError=(error)=> {
        console.log(error);
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    };
    registration =(event)=>{
        event.preventDefault();
        this.form={
            firstName:this.state.firstName,
            secondName:this.state.secondName,
            login:this.state.login,
            password:this.state.password,
            email:this.state.email

        };
        axios.post('http://127.0.0.1:3030/registration',this.form,{
            headers:{
            }
        }).then((response)=>{
            console.log(response);
            let clearData = response.data;
            if(clearData.text===undefined){
                this.props.history.push("/login");
            }
            else {
                this.setState({errorText:clearData.text});
                this.setState({error:true});
                console.log(this.error);
            }
        })


    };

    render(){
        return(
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-4"></div>
                    <div className="col">

                        <form onSubmit={this.registration}>
                            {this.state.error === true ? this.getError(this.state.errorText) : null}
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <input type="text" className="form-control"
                                       id="firstName" name="firstName"
                                       value={this.state.firstName} onChange={this.firsNameChange.bind(this)} placeholder="First name"/>
                                <label htmlFor="secondName">Second name</label>
                                <input type="text" className="form-control"
                                       id="secondName" name="secondName"
                                       value={this.state.secondName} onChange={this.secondNameChange.bind(this)} placeholder="Second name"/>
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control"
                                       id="email" name="email"
                                       value={this.state.email} onChange={this.emailChange.bind(this)} placeholder="Email"/>
                                <label htmlFor="login">Login</label>
                                <input type="text" className="form-control" id="login" name="login"
                                       aria-describedby="loginHelp" placeholder="Enter login"
                                       value={this.state.login} onChange={this.loginChange.bind(this)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" name="password"
                                       id="exampleInputPassword1"
                                       placeholder="Password" value={this.state.password}
                                       onChange={this.passwordChange.bind(this)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword2">Confirm Password</label>
                                <input type="password" className="form-control" name="password"
                                       id="exampleInputPassword2"
                                       placeholder="Confirm Password" value={this.state.confirmPassword}
                                       onChange={this.confirmPasswordChange.bind(this)}/>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <button type="submit" className="btn btn-primary">Sign up</button>
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

export default Registration;