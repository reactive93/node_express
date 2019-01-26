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




module.exports.createUser = function (user) {
    database("user_entity").insert(user).catch(error => {console.log(error)})
};

module.exports.getUser =  function (login){
    const userFromDb =  database("user_entity").where({login:login}).select();
    return userFromDb;
};

exports.createGroup = function (user, group_name,link) {

    return database("group_entity").select().where("link",link).then(
        (data)=>{
            if (data.length>0){
                throw new Error("User ERROR:This name already exist");
            }
            else {
                return database("group_entity").insert({name:group_name, creator_id:user.id, is_creator:true, link: link});
            }
        }
    );
};

exports.getGroups = function (user_id) {

    return database("group_entity").select("*").where("user_id",user_id).
        or.
    where("is_creator",true).and.where("creator_id",user_id);

};
//database("group_entity").insert({name: group.name, user_id: user[0].id})
exports.addUserToGroup = function (user_name, link) {

    return this.getUser(user_name).then((user)=>{
        if (user.length > 0){
            return user[0];
        }
        else {
            throw new Error("Dont found user");
        }
    }).then(user=>{
        return database("group_entity").where("link", link).and.where("user_id", user.id).select().
        then(group=>{
            if (group.length > 0){
                throw new Error("This user already in group")
            }
            else {
                return database("group_entity").select().where("link", link).then(group1=>{
                  return database("group_entity").insert({name: group1[0].name, creator_id:group1[0].creator_id, user_id:user.id, link:group1[0].link})
                })
            }
        })
    })
};

exports.delete_group = function (user_id, creator_id, link) {
    return database("group_entity").where("user_id", user_id).and.where("link", link).
    or.where("creator_id", user_id).where("link", link).and.where("user_id",null).del();
};