import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import './index.css';
import 'antd-mobile/dist/antd-mobile.css';
import App from './App';
FastClick.attach(document.body);

ReactDOM.render(<App />, document.getElementById('root'));
