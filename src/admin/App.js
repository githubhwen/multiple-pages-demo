import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import Login from "./login/Login.js";
import MenuA from './menu/menu.js'

class App extends Component {
  render() {
    let isLogin = false
    if (localStorage.getItem('user')) {
      isLogin = true
    }
    return (
        <HashRouter>
          <Route exact path="/" render={() => (
              !isLogin ? (
                  <Redirect to="/login" />
              ) : (
                  <Redirect to="/menu" />
              )
          )} />
          <Route  path="/login" component={Login} />
          <Route  path="/menu" component={MenuA} />
        </HashRouter>
    )
  }
}

export default App;

