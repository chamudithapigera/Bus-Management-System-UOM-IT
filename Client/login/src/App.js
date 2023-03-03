import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Aboutus from './pages/Aboutus';

function App() {
  return (
    <Router>
      <NavBar/> 
      <Switch>
        <Route path="/" exact component={Homepage}/>
        <Route path="/Aboutus" component={Aboutus}/>

      </Switch>

    </Router>
  );
}
export default App;
