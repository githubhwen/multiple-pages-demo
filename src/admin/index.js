import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './timeManagement/reducers'
import './index.css';
import App from './App';

const store = createStore(rootReducer);

document.getElementById('root').style.minHeight = window.innerHeight+'px';
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
