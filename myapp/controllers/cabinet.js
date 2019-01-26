
const jsonwebToken = require("jsonwebtoken");

const database = require("../db/database");

function create_group(req, res) {

    //body have :->{group_name}
    const body = req.body;
    const user = req.user;
    const link = body.group_name.split(" ").join("_");
    database.createGroup(user, body.group_name, link).then(()=>{
        res.status(200).send({text:"ok"});
        res.end();
    }).catch(error => {
        console.log(error);
        if (error.message.includes("User ERROR")){
            res.send({error:"This name for group already exist"});
            res.end();
        }
        else {
            res.send({error:"error create group"});
            res.end();
        }


    });

}

function get_all_groups(req, res){
    const user = req.user;
    database.getGroups(user.id).then(groups=>{
        res.send({user:user, groups:groups});
        res.end();
    });
}

function add_user_to_group(req, res){

    const body = req.body;
    database.addUserToGroup(body.username, body.link).then(()=>{
        res.end();
    }).catch(error => {
        console.log(error);
        res.send({error:error.message})
    })

}

function delete_group(req, res){
    // body have :-> creator_id, link, user_login, user_id
    const body = req.body;
    database.delete_group(body.user_id, body.creator_id,body.link).then(()=>{
        res.send({});
        res.end();
    }).catch(error => {
        res.send({error:"internal server error"});
        res.end();
    })
}

module.exports.create_group = create_group;
module.exports.get_all_groups = get_all_groups;
module.exports.addUser = add_user_to_group;
module.exports.removeGroup = delete_group;