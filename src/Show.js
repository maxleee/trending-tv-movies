/* eslint-disable react/destructuring-assignment */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {animated, Spring} from 'react-spring/renderprops';

const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280/';

const Show = ({show, style}) => {
  const [hovered, setHovered] = useState(false);
  const setHover = () => setHovered(true);
  const cancelHover = () => setHovered(false);

  return (
    <Spring
      to={{
        transform: `scale(${hovered ? 1.1 : 1})`
      }}
    >
      {props => (
        <Link to={`${show.id}`} onMouseOver={setHover} onMouseOut={cancelHover}>
          <ShowCard style={style}>
            <h2>{show.name || show.title}</h2>
            <img
              src={`${BACKDROP_PATH}${show.backdrop_path}`}
              alt={show.name}
              style={props}
            />
          </ShowCard>
        </Link>
      )}
    </Spring>
  );
};

Show.propTypes = {
  show: PropTypes.shape({
    name: PropTypes.string,
    overview: PropTypes.string,
    id: PropTypes.number
  }).isRequired
};

Show.defaultProps = {};

export default Show;

const ShowCard = styled(animated.div)`
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
    z-index: 10;
  }
  img {
    width: 100%;
  }
`;
