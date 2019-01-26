


module.exports.validUser = function (user) {

    if(user.login===''){
        return false;
    }
    if(user.password===''){
        return false;
    }
    if (user.email===''){
        return false;
    }
    return true;
};