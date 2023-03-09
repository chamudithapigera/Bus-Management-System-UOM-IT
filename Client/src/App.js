import React from 'react';
import Home from './Pages/Home';
import FilteredBuses from './Pages/FilteredBuses';
import { BrowserRouter as Switch, Route, Router } from 'react-router-dom';
import './App.css';
function App() {

  return (
    <div className="App">
    <Switch>
     
        <Route exact path="/" component={Home} />
        <Route path="/filteredBuses" component={FilteredBuses} />
      
      </Switch>
    </div>
  );
}

export default App;
