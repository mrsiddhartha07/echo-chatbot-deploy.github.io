import React from 'react';
import {connect} from 'react-redux';
import actionsCreator from '../../actionsCreator';
import {TRIGGER_LOGIN} from '../../constants';
import './loginPage.css'

class LoginPage extends React.Component {
    state = {
        username : "" ,
        password : ""
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        this.props.triggerLogin(this.state.username);
        this.props.history.push("/chatwindow");
    }
    inputChangeHandler = (event) => {
        if(event.target.name === "username")
            {
                this.setState({
                    username : event.target.value
                })
            }
        else {
                this.setState({
                    password : event.target.value
                })
        }
    }
    render () {
        return (
            <div className = "login-component container">
            <h1>Welcome To ChatBot</h1>
                <form className="my-5 login-form text-left container w-50" method="post" onSubmit={this.submitFormHandler}>
                    <h3 className="text-center">Login</h3>
                    <div className="form-group">
                        <label className="d-block">User Name</label>
                        <input className="d-block form-control" name = "username" type="text" placeholder="Enter username" required value={this.state.username} onChange={this.inputChangeHandler}/>
                    </div>
                    <div className="form-group">
                        <label className="d-block">Password</label>
                        <input className="d-block form-control"name = "password" type="password" placeholder="Enter password" required value={this.state.password} onChange={this.inputChangeHandler}/> 
                    </div>
                    <button className="btn-primary btn-lg btn-block form-control">Sign In</button>             
                </form>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        triggerLogin : (username) => {
            dispatch(actionsCreator(TRIGGER_LOGIN, username))
        }
    }
};

export default connect(null, mapDispatchToProps)(LoginPage);