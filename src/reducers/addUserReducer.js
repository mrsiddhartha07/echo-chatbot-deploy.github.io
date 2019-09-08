import {TRIGGER_LOGIN } from "../constants";

const initialState = {
    currentUser : "",
    users : []
};

const addUser = (state = initialState, action) => {
    switch(action.type) {
        case TRIGGER_LOGIN : { 
            return {
                ...state,
                currentUser: action.payload,
                users: state.users.indexOf(action.payload) !== -1 ? [...state.users] : [...state.users, action.payload]
            };
        }
        default: return state;
    }
}

export default addUser;

