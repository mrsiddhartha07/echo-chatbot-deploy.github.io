import React from 'react';
import { connect } from "react-redux";
import actionCreator from '../../actionsCreator';
import {CHAT_CONNECTED, CHAT_DISCONNECTED, CHAT_ERROR, ON_MESSAGE} from "../../constants";
import "./chatWindow.css"

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.websocket = new WebSocket("wss://echo.websocket.org/");
        this.websocket.onopen = (evt) => { this.onOpen(evt) };
        this.websocket.onclose = (evt) => { this.onClose(evt) };
        this.websocket.onmessage = (evt) => { this.onMessage(evt) };
        this.websocket.onerror = (evt) => { this.onError(evt) };
    }
    state = {
        chat: ""
    }

    onMessage = (e) => {
        this.props.addMessage({
            username: this.props.chatBot,
            chat: e.data
        });
    }

    onOpen = (event) => {
        // Connected
        this.props.connectedWebSocket();
    }

    changeChatHandler = (e) => {
        this.setState({
            chat: e.target.value
        })
    }

    submitChatHandler = (e) => {
        e.preventDefault();
        this.props.addMessage({
            username: this.props.currentUser,
            chat: this.state.chat
        });
        this.websocket.send(this.state.chat);

    }
    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    }
    backToLogin() {
        window.history.back();
    }
    render () {
        if(!this.props.connected) {
            return <div>Loading</div>;
        }
        else if(this.props.error) {
            return <div>Failed to Connect</div>;
        }
        else {
            return (
                <div className = "chat-window container">
                    <div className="container">
                        {this.props.usersChat.map((singleChat, index) => {
                            return (
                                <div data-username = {singleChat.username} className ={singleChat.username === "ChatBot" ? "text-left" : "text-right"} key={singleChat.username + index}>
                                    <span>{singleChat.username + " : "}</span>
                                    <span>{singleChat.chat}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="chat-box ">
                    <form method="post" className = "d-flex" onSubmit={this.submitChatHandler}>
                        <input type="text d-block" className ="form-control" name="chatText" value={this.state.chat} required onChange={this.changeChatHandler} placeholder="Enter your message here" />
                        <button type="submit" className = "btn-secondary btn-lg ml-2">Send</button>
                        <div>
                            <button onClick ={()=>{this.backToLogin()}} className = "btn-primary mr-3 back-to-login">Back To Login</button>
                        </div>
                    </form>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        ...state.handleChat,
        ...state.addUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        connectedWebSocket: () => {
            dispatch(actionCreator(CHAT_CONNECTED))
        },
        disconnectedWebSocket: () => {
            dispatch(actionCreator(CHAT_DISCONNECTED))
        },
        addMessage: (data) => {
            dispatch(actionCreator(ON_MESSAGE, data))
        },
        onError: () => {
            dispatch(actionCreator(CHAT_ERROR));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
