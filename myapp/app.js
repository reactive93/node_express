var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const routerApi = require("./routes/api");
const jsonwebToken = require("jsonwebtoken");


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.options('*', cors());
app.use(cors());

app.use((req, res, next)=>{


    if (req.path==="/login" || req.path=== "/registration"){
        next();
    }
    else{

        if(req.method==="OPTIONS"){
            next();
        }
        if (req.headers.authorization){
            let token = req.headers.authorization;
            try{
                let userSerialized = jsonwebToken.verify(token,"secret");
                req.user = userSerialized;
                    next();
            }catch (e) {
                res.send(401,{error:"unauthorized"});
                res.end();
            }
        }
        else {
            res.send(401,{error:"unauthorized"})
        }

    }

});


app.use(routerApi.routerApi);

module.exports = app;
