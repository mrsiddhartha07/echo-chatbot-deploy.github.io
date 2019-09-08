import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux' 
import reducers from './reducers' 
const store = createStore(reducers) 

ReactDOM.render(<Routes store={store} />, document.getElementById('root'));

serviceWorker.unregister();
