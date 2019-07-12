import React, { Component } from 'react';
import './App.css';
import Show from './Show';

class App extends Component {
  state = {
    tv: [],
  };
  async componentDidMount() {
    try {
      const result = await fetch(
        'https://api.themoviedb.org/3/discover/tv?api_key=3c5dee1740e9688bb656d073abfb0126&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false',
      );
      const shows = await result.json();

      this.setState({
        tv: shows.results,
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    console.log(this.state.tv);
    return (
      <div className="App">
        <header className="App-header">
          <h1>LUTV</h1>
        </header>
        {this.state.tv.map(show => (
          <Show key={show.id} show={show} />
        ))}
      </div>
    );
  }
}

export default App;
