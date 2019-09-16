import React, { Component } from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux"

import store from './store/index'
import './App.css';

import Main from "./components/Main"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
