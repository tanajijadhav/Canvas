import React, { Component } from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import './App.css';

import Main from "./components/Main"

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <Main/>
      </BrowserRouter>
     
    );
  }
}

export default App;
