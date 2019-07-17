/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154/';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w300/';

const Show = ({ show }) => (
  <Link to={`${show.id}`}>
    <ShowCard backdrop={`${BACKDROP_PATH}${show.backdrop_path}`}>
      <h2>{show.name}</h2>
    </ShowCard>
  </Link>
);

Show.propTypes = {
  show: PropTypes.shape({
    name: PropTypes.string,
    overview: PropTypes.string,
  }).isRequired,
};

Show.defaultProps = {};

export default Show;

export const Poster = styled.img`
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.7), 0 2px 6px black;
`;

const ShowCard = styled.div`
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
  min-height: 200px;
  border-radius: 5px;
  margin: 1rem;
  position: relative;
  h2 {
    text-decoration: none;
    color: white;
    text-align: left;
    position: absolute;
    padding-left: 20px;
    bottom: 0;
  }
`;
