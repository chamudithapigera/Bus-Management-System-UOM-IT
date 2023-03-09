import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);


