import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from './redux/store'
import { Provider, useSelector } from 'react-redux'
import 'bootstrap';
import './index.css';
import App from './App';
import Login from './pages/HomePage/Login'
import SignUp from './pages/HomePage/SignUp'
import ProtectedRoute from './components/ProtectedRoute'

// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();