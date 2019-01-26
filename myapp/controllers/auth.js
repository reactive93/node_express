
const database = require("../db/database");
const bcrypt = require("bcrypt");
const utilAuth = require("./utilAuth");
const jsonwebToken = require("jsonwebtoken");

function login(req, res) {
    const body = req.headers.authorization;
    const spliter_body = body.split(" ");
    const auth = spliter_body[1];
    const decode_auth = new Buffer(auth,"base64");
    const decoded_auth = decode_auth.toString();
    const splited_decoded_auth = decoded_auth.split(":");
    const login = splited_decoded_auth[0];
    const password= splited_decoded_auth[1];

    database.getUser(login).then((arrayUsers)=>{
        return arrayUsers[0];
    }).then(user=>{

        if (user){

            bcrypt.compare(password,user.password).then(isequal=>{
                if(isequal){
                    const token_user = {
                        id: user.id,
                        login:user.login,
                    };
                    const token = jsonwebToken.sign(token_user, "secret", {expiresIn: 120 });
                    res.send({token:token, id: user.id});
                    res.end();
                }
                else{
                    res.send({})
                }
            }).catch(error => {
                res.send({});
            });

        }
        else {
            res.send({});
        }

    })
}

function registration(req, res){

    const body = req.body;

    if(!utilAuth.validUser(body)){
        res.json({text:"error"});
        return;
    }

    console.log(body);

    database.getUser(body.login).then( arrayUsers=>{
        if(arrayUsers.length>0){
            res.json({text:"this login already in use!!"});
            res.end();
        }
        else {
            bcrypt.hash(body.password,10,(err,hash)=>{

                if(err){
                    console.log(err);
                }
                else {
                    database.createUser({login:body.login, password:hash, email:body.email, is_active:true});
                    res.end();
                }
            });
        }
    });
}

exports.login = login;
exports.registration = registration;