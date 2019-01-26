import {createStore} from 'redux'
import {Loggin} from "./actions";


const initialState={
    isLogged:false,
    token:'',
    login:'',
    id:''
};

 export const rootReducer=(state=initialState, action)=>{

     switch (action.type) {
         case 'LOGGIN':
             return {...state, isLogged: action.isLogged,token: action.token, login:action.login, id:action.id};
         case "LogOut":
             return {...state,isLogged:action.isLogged,token:action.token,login:action.login, id:action.id};
     }

    return state;
};

export const store = createStore(rootReducer);

