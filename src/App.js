import React, {Component} from 'react';
import './App.css';
import Show from './Show';

const tv = [
  {
    id: 1,
    name: 'The Real Housewives'
  },
  {
    id: 2,
    name: 'Below Deck'
  },
  {
    id: 3,
    name: 'Big Brother'
  }
];
class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>LUTV</h1>
        </header>
        {tv.map(show => (
          <Show key={show.id} show={show} />
        ))}
      </div>
    );
  }
}

export default App;
