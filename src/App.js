/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import ShowList from './ShowList';
import ShowDetail from './ShowDetail';
import Toggle from './Toggle';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <h1>LUTV</h1>
        </Link>
      </header>
      <Toggle>
        {({ on, toggle }) => (
          <div>
            {on && <h1>Show Me</h1>}
            <button onClick={toggle}>Show/Hide</button>
          </div>
        )}
      </Toggle>

      <Switch>
        <Route path="/:id" component={ShowDetail} />
        <Route exact path="/" component={ShowList} />
      </Switch>
    </div>
  </Router>
);

export default App;
