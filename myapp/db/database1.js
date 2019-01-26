const knex = require("knex");
const bcrypt = require("bcrypt");

const url_db = "postgresql://onlineuser:online@127.0.0.1:5432/myDB";

const database = new knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'onlineuser',
        password: "online",
        database: "myDB2"
    }
});

// database("user_entity").select().then(resp=>{
//    console.log(resp);
// }).finally(database.destroy());


user = {
    login:"111",
    password:"111",
    email:"lol@mail.ru",
    is_active:true

};

// database("user_entity").insert(user).thenReturn();

function check(user){
    var isExist=false;
    database("user_entity").where({login: user.login}).select().then(res=>{

        if(res.length>0)
            console.log(res);
        isExist = true;
    });
    console.log('after then');
    return isExist;

}

var res = check(user);
console.log(res);
