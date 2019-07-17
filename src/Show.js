/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154/';
const Show = ({show}) => (
  <div>
    <Link to={`${show.id}`}>
      <img src={`${POSTER_PATH}${show.poster_path}`} alt='' />
    </Link>
    <h3>{show.name}</h3>
    <p>{show.overview}</p>
  </div>
);

Show.propTypes = {
  show: PropTypes.shape({
    name: PropTypes.string,
    overview: PropTypes.string
  }).isRequired
};

Show.defaultProps = {};

export default Show;
