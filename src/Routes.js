import React from 'react';
import './Routes.css';
import LoginPage from './components/loginPage/loginPage';
import ChatWindow from './components/chatWindow/chatWindow';
import WelcomePage from './components/welcomePage/welcomePage';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' ;

const Routes = ({ store }) => (
    <Provider store={store}>
      <Router>
        <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/chatwindow" component={ChatWindow} />
        </Switch>
      </Router>
    </Provider>
  ) 
export default Routes;