import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from "./home.js";

class App extends Component {
  render() {
    let isLogin = false
    if (localStorage.getItem('user')) {
      isLogin = true
    }
    return (
        <BrowserRouter>
          <Route  path="/" search="?name=e-commerce" component={Home} />
        </BrowserRouter>
    )
  }
}

export default App;

