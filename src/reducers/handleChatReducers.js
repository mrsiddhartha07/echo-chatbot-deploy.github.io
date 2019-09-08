import {CHAT_CONNECTED, CHAT_DISCONNECTED, CHAT_ERROR, ON_MESSAGE} from "../constants";

const initialState = {
    usersChat : [],
    connected: false,
    chatBot: "ChatBot",
    error: false
}

const handleChat = (state = initialState, action) => {
    switch(action.type) {
        case CHAT_CONNECTED: {
            return {
                ...state,
                connected: true
            }
        }
        case CHAT_DISCONNECTED: {
            return {
                ...state,
                connected: false
            }
        }
        case CHAT_ERROR: {
            return {
                ...state,
                error: true
            }
        }
        case ON_MESSAGE: {
            if(state.usersChat === []) {
                return {
                    ...state,
                    usersChat: [
                        {
                            username: action.payload.username,
                            chat: action.payload.chat
                        }
                    ]
                }
            } else {
                return {
                    ...state,
                    usersChat: [...state.usersChat, action.payload]
                }
            }
        }
        default: return state
    }
}

export default handleChat;