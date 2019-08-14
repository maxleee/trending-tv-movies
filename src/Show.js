/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280/';

const Show = ({ show, style }) => (
  <Link to={`${show.id}`}>
    <ShowCard style={style}>
      <h2>{show.name}</h2>
      <img src={`${BACKDROP_PATH}${show.backdrop_path}`} alt={show.name} />
    </ShowCard>
  </Link>
);

Show.propTypes = {
  show: PropTypes.shape({
    name: PropTypes.string,
    overview: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

Show.defaultProps = {};

export default Show;

export const Poster = styled.img`
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.7), 0 2px 6px black;
`;

const ShowCard = styled.div`
  max-height: 200px;
  border-radius: 5px;
  margin: 1rem;
  position: relative;
  overflow: hidden;

  h2 {
    text-decoration: none;
    color: white;
    text-align: left;
    position: absolute;
    padding-left: 20px;
    bottom: 0;
    text-shadow: 0 2px 15px rgba(0, 0, 0, 0.8);
  }
  img {
    width: 100%;
  }
`;
