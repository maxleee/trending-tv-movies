/* eslint-disable react/destructuring-assignment */
import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import ShowList from './ShowList';
import ShowDetail from './ShowDetail';
import Toggle from './Toggle';
import Menu from './Menu';

class App extends Component {
  state = {
    tv: [],
  };

  async componentDidMount() {
    try {
      const result = await fetch(
        'https://api.themoviedb.org/3/trending/tv/week?api_key=3c5dee1740e9688bb656d073abfb0126',
      );
      const shows = await result.json();

      this.setState({
        tv: shows.results,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header className="App-header">
            <Link to="/">
              <h1>LUTV</h1>
            </Link>
            <Toggle>
              {({ on, toggle }) => (
                <Fragment>
                  <button onClick={toggle}>Menu</button>
                  <Menu on={on} toggle={toggle}>
                    <h1>In a Menu</h1>
                  </Menu>
                </Fragment>
              )}
            </Toggle>
          </Header>

          <Switch>
            <Route
              path="/:id"
              render={props => <ShowDetail {...props} tv={this.state.tv} />}
            />
            <Route
              exact
              path="/"
              render={props => <ShowList {...props} tv={this.state.tv} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

const Header = styled.header`
  background-color: #111;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;

  h1 {
    font-size: 22px;
  }
  a {
    text-decoration: none;
    color: white;
    transition: 0.2s all ease-out;
  }
  a:hover {
    transform: translateY(-3px);
  }
  button {
    position: absolute;
    left: 2rem;
  }
`;
