/* eslint-disable react/destructuring-assignment */
import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import ShowList from './ShowList';
import ShowDetail from './ShowDetail';
import { Toggle } from 'Utilities';
import { Menu, Icon } from 'Elements';

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
          <Header>
            <Toggle>
              {({ on, toggle }) => (
                <Fragment>
                  <button onClick={toggle}>
                    <Icon name="menu" color="#fff" />
                  </button>
                  <Menu on={on} toggle={toggle} />
                </Fragment>
              )}
            </Toggle>
            <Link to="/">LUTV</Link>
            <div />
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
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: white;

  a {
    font-size: 22px;
    font-weight: 700;
    text-decoration: none;
    color: white;
    transition: 0.2s all ease-out;
    padding: 0;
  }
  a:hover {
    transform: translateY(-3px);
  }
  button {
    background: transparent;
    border: none;
    width: 20px;
    padding: 10px;
    box-sizing: content-box;
    margin-left: 2rem;
  }
`;
