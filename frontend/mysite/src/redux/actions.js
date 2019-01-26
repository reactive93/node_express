


export const Loggin= (isLoggin, token, login, id)=>{
    return {
        type: 'LOGGIN',
        isLogged: isLoggin,
        token: token,
        login: login,
        id: id
    }
};

export const LogOut=(isLoggin, token, login, id)=>{

    return {
        type: "LogOut",
        isLogged: isLoggin,
        token: token,
        login:login,
        id: id
    }

};