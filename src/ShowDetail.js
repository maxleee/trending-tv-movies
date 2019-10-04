import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TVInfoPanel from './TVInfoPanel';
import MovieInfoPanel from './MovieInfoPanel';
import { useSpring, animated } from 'react-spring';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w342/';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280/';

const ShowDetail = props => {
  const [showData, setShowData] = useState({});
  const [isLoaded, setLoaded] = useState(false);
  const id = props.match.params.id;

  const headerProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  const leftColumnProps = useSpring({
    opacity: 1,
    transform: 'translateY(-30px)',
    from: { opacity: 0, transform: 'translateY(30px)' },
  });

  useEffect(() => {
    const fetchShowData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/${props.category}/${id}?api_key=3c5dee1740e9688bb656d073abfb0126&language=en-US`,
      );
      const data = await res.json();
      setShowData(data);
      setLoaded(true);
    };
    fetchShowData();
  }, [id, props.category]);

  return (
    <ShowWrapper>
      {isLoaded && (
        <React.Fragment>
          <ShowHeader style={headerProps}>
            <img
              src={`${BACKDROP_PATH}${showData.backdrop_path}`}
              alt={`${showData.name} Backdrop`}
            />
            <Button to="/">Back</Button>
          </ShowHeader>
          <ShowInfo>
            <LeftColumn style={leftColumnProps}>
              <Poster src={`${POSTER_PATH}${showData.poster_path}`} alt="" />
              <GenreTags>
                {showData.genres.map(genre => (
                  <p key={genre.id}>{genre.name}</p>
                ))}
              </GenreTags>
              {props.category === 'tv' && (
                <>
                  <NetworkLogo
                    src={`https://image.tmdb.org/t/p/w92/${showData.networks[0].logo_path}`}
                  />
                </>
              )}
            </LeftColumn>
            {props.category === 'tv' && <TVInfoPanel showData={showData} />}
            {props.category === 'movie' && (
              <MovieInfoPanel showData={showData} />
            )}
          </ShowInfo>
        </React.Fragment>
      )}
    </ShowWrapper>
  );
};

export default ShowDetail;

const LeftColumn = styled(animated.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  top: -15rem;
  align-items: flex-start;
  margin-right: 40px;
  width: 30%;

  @media (max-width: 600px) {
    width: 100%;
    align-items: center;
    margin-right: 0px;
    top: 0rem;
  }
`;

const Button = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  font-size: 1.15rem;
  position: absolute;
  top: 20px;
  color: white;
  margin-left: 10%;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.6);
  transition: transform 0.2s;
  :hover {
    transform: translateY(-3px);
  }
`;

const Poster = styled.img`
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.7), 0 2px 6px black;
  width: 100%;

  @media (max-width: 600px) {
    width: 75%;
  }
`;

const GenreTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;

  p {
    padding: 5px 10px;
    margin: 5px;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    color: #c1c1c1;
  }
`;

const NetworkLogo = styled.img`
  margin: 15px 5px;
  height: 16px;
`;

const ShowWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const ShowHeader = styled(animated.div)`
  width: 100%;
  height: 40vh;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  position: relative;
  img {
    width: 100vw;
  }

  @media (max-width: 600px) {
    height: inherit;
  }
`;

const ShowInfo = styled.div`
  background: #222;
  color: white;
  text-align: left;
  padding: 1rem 10%;
  display: flex;
  max-width: 90vw;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
