import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import connect from "react-redux/es/connect/connect";
import {NavLink,BrowserRouter,Router} from "react-router-dom";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import io from "socket.io-client";
import {eraser, pen, move,next,back} from "../components/group_canvas";
import MathBoard from "../components/MathBoard";

export default class Group extends Component{

    constructor(props){
        super(props);
        const creator = this.props.match.params.creator_id;
        const link = this.props.match.params.link;
        const room = "/"+creator+"/"+link;
        const socket = io("ws://127.0.0.1:3030/",{});
        socket.on("connect",()=>{
            console.log("connected websocket");
            socket.emit("room",room);
        });
        this.state ={
            socket: socket,
            room: room,
            context: null,
            active_action: '',
            //{page:..., canvas:...}
            canvas_list: [],
            current_canvas:null,
            page: 0,
            total:0,
        };
        socket.on(room, (data)=>{
            console.log(data);
            let res = JSON.parse(data);
            console.log(res['x']+" "+ res['y']);
            console.log(Object.getOwnPropertyNames(res).indexOf('start'));
            if (res.pen){
                this.state.context.globalCompositeOperation = 'source-over';
                this.state.context.strokeStyle = "#000";
                this.state.context.fillStyle="#000";
                this.state.context.lineWidth = "1";

                if (Object.getOwnPropertyNames(res).indexOf('start') != - 1)
                {
                    if (res['start']==1){
                        this.state.context.beginPath();
                        this.state.context.moveTo(res['x'], res['y']);
                        console.log('context start');
                    }
                    else {
                        this.state.context.lineTo(res['x'], res['y']);
                        this.state.context.stroke();

                        console.log('context close');
                    }
                }
                else
                {
                    this.state.context.lineTo(res['x'], res['y']);
                    this.state.context.stroke();
                }
            }
            else {
////////////////////////////////////////////
                this.state.context.globalCompositeOperation = 'destination-out';
                this.state.context.lineWidth = 20;
                if (Object.getOwnPropertyNames(res).indexOf('start') != - 1)
                {
                    if (res['start']==1){
                        this.state.context.beginPath();
                        this.state.context.arc(res['x'], res['y'], 10, 0, 2 * Math.PI);
                        this.state.context.fill();
                        this.state.context.lineTo(res['x'], res['y']);
                        console.log('context start');
                    }
                    else {
                        this.state.context.lineTo(res['x'], res['y']);
                        this.state.context.stroke();
                        console.log('context close');
                    }
                }
                else
                {
                    this.state.context.lineTo(res['x'], res['y']);
                    this.state.context.stroke();
                }
                console.log(this.state.context);
                /////////////////////////////////
            }
            if(this.state.active_action==="pen"){
                pen(this.refs.canvas, this.state.context, this.state);
            }
            else {
                eraser(this.refs.canvas, this.state.context, this.state);
            }
        });
    }

    componentDidMount(){
        this.setState({active_action:'pen'});
        this.createCanvas(this.state);

    }

    createCanvas(state){
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        console.log(canvas);
        const context = canvas.getContext("2d");
        this.setState({context:context});
        const mouse = { x:0, y:0};
        let draw = false;
        console.log(context);


        canvas.onmousedown = function(e){

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            draw = true;
            context.beginPath();
            context.moveTo(mouse.x, mouse.y);
            state.socket.emit(state.room, JSON.stringify({pen:true, 'start': 1, 'x': mouse.x, 'y': mouse.y}) )
        };
        canvas.onmousemove = function(e){

            if(draw===true){

                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;
                context.lineTo(mouse.x, mouse.y);
                context.stroke();
                state.socket.emit(state.room, JSON.stringify({pen:true, 'x': mouse.x, 'y': mouse.y}) );
            }
        };
        canvas.onmouseup = function(e){
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
            draw = false;

            state.socket.emit(state.room, JSON.stringify({pen:true, 'start': 0, 'x': mouse.x, 'y': mouse.y}) );

        };
        canvas.onmouseleave = function (e) {
            draw = false;
        };

    }

    actionEraser = ()=>{
        this.setState({active_action:"eraser"});
        eraser(this.refs.canvas, this.state.context, this.state);
    };

    actionPen = ()=>{
        this.setState({active_action:"pen"});
        pen(this.refs.canvas, this.state.context, this.state);
    };
    actionMove = ()=>{
        this.setState({active_action:"move"});
        move(this.refs.canvas, this.state.context, this.state);
    };
    actionNext = ()=>{

        next(this.refs.canvas, this.state.context, this.state, this);

    };
    actionBack = ()=>{
        if (!this.state.total==0){
            back(this.refs.canvas, this.state.context, this.state, this);
        }

    };
    send(str){
        console.log(this);
        this.state.socket.emit(this.state.room, str);
    }

    render() {
        return (
            <div className="container">
                {/*<input type="text" onChange={this.changeText.bind(this)}/>*/}
                {/*<button onClick={this.send.bind(this)}>send</button>*/}
                <div className="row">
                    Active action: {this.state.active_action}
                    <div className="col-1">
                        <button onClick={this.actionEraser}>eraser</button>
                    </div>
                    <div className="col-1">
                        <button onClick={this.actionPen}>pen</button>
                    </div>

                    <div className="col-1">
                        <button onClick={this.actionNext}>next</button>
                    </div>
                    <div className="col-1">
                        <button onClick={this.actionBack}>back</button>
                    </div>
                    <div className="col-1">
                        Page {this.state.page+1} of {this.state.total+1}
                    </div>
                </div>
                <div className="row">
                    <canvas ref="canvas" id="myCanvas1" width={document.documentElement.clientWidth/1.23} height={document.documentElement.clientHeight/1.2} style={{backgroundColor:"#fff8ad"}}/>
                </div>
                <div className="row">
                    <MathBoard/>
                </div>
            </div>
        );
    }

}

