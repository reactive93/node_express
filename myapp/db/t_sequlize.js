const postgres = require("pg");
const Sequelize = require('sequelize');
const User = require("./t_models_seq").User;
const url_db = "postgresql://onlineuser:online@127.0.0.1:5432/onlineboard_db";

// const sequelize = new Sequelize(url_db,null,null,{
//     omitNull:true,
//     dialect:"postgres",
//     operatorsAliases: false
// });


User.create({login:"55563",password:"55563"},).then(user=>{
    console.log(user);
}).catch(error => {console.log(error)});
