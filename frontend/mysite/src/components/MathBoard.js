import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import connect from "react-redux/es/connect/connect";
import {NavLink,BrowserRouter,Router} from "react-router-dom";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import "katex/dist/katex.css";
import katex from "katex";


export default class MathBoard extends Component{

    constructor(props){
        super(props);
        this.element=null;

    }
    componentDidMount(){
        this.element = document.getElementById("formula");
        katex.render("\\int_{2}^{2}{xdx}\\frac{2}{3}", this.element,{throwOnError: false});

    }

    render() {

        return (
            <div>
                <div id="katex" className="katex">
                </div>
                <span id="formula"></span>
            </div>
        );
    }
}