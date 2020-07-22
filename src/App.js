/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import styled from 'styled-components';

import ShowList from './ShowList';
import ShowDetail from './ShowDetail';
import {key} from 'Utilities';
import {Icon} from 'Elements';
import Search from './search'

const App = () => {
  const [tv, setTv] = useState([]);
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('tv');
  const [isSearch, setIsSearch] = useState(false)

  const fetchTv = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${key}&language=en-US`
    );
    const data = await res.json();
    setTv(data.results);
  };

  const fetchMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US`
    );
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    fetchTv();
    fetchMovies();
  }, []);

  const handleOnChange = (e) => {
    setCategory(e.target.value)
    setIsSearch(false)
  }

  let title
  if(category === "tv") {
    isSearch ?
    title = "TV Search Results" : title="Trending TV"
  } else if (category === "movie") {
    isSearch ?
    title="Movie Search Results" : title = "Trending Movies"
  }


  console.log(title)

  return (
    <Router>
      <div className='App'>
        <Header>
          <SegmentedControl onChange={handleOnChange}>
            <input type="radio" name="category" value="tv" id="tv" checked={category === 'tv'} />
            <label htmlFor="tv">📺 TV</label>
            <input type="radio" name="category" value="movie" id="movie" checked={category === 'movie'} />
            <label htmlFor="movie">🎥 Movies</label>
          </SegmentedControl>
          <Link to='/'>
            {title}
          </Link>
          <Search setMovies={setMovies} setCategory={setCategory} setIsSearch={setIsSearch}/>
          
        </Header>

        <Switch>
          <Route
            path='/:id'
            render={props => <ShowDetail {...props} category={category} />}
          />
          <Route
            exact
            path='/'
            render={props => (
              <ShowList
                {...props}
                tv={tv}
                movies={movies}
                category={category}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

const Header = styled.header`
  background-color: #111;
  min-height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  font-size: calc(10px + 2vmin);
  color: white;

  a {
    font-size: 22px;
    font-weight: 700;
    text-decoration: none;
    color: white;
    transition: 0.2s all ease-out;
    padding: 0;
    margin-right: 2rem;
  }
  button.menu {
    background: transparent;
    border: none;
    width: 20px;
    padding: 10px;
    box-sizing: content-box;
    margin-left: 2rem;
  }
`;

const SegmentedControl = styled.div`
  display: flex;
  max-width: 200px;
  width: 100%;
  position: relative;
  user-select: none;
  z-index: 1;
  font-size: .85rem;
  font-weight: 600;
  border: 1px solid #fff;
  border-radius: 50px;
  color: #fff;
  input {
    display: none;
    &:checked + label { 
      color: black;
    }
    &:nth-of-type(1):checked ~ label:last-of-type:before {
      transform: translateX(0px);
      border-radius: 50px 0px 0px 50px;
    }
    &:nth-of-type(2):checked ~ label:last-of-type:before {
      transform: translateX(100px);
      border-radius: 0px 50px 50px 0px;
    }
    }
  
  label {
    flex: 1;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    padding: 6px 3px;
    transition: color 250ms cubic-bezier(0,.95,.38,.98);
    &:last-of-type:before {
      content: "";
      display: block;
      max-width: 100px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      transform: translateX(0);
    }
    &:before {
      background: white;
      transition: all 250ms ease-out;
    }
    &:not(:last-child){
      border-right: 1px solid #fff;
    }
  }
`
