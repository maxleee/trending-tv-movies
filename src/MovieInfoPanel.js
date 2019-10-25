import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useSpring, animated} from 'react-spring';
import {key} from './Utilities';

const MovieInfoPanel = props => {
  const {showData} = props;
  const [cast, setCast] = useState([]);
  const [castLoaded, setCastLoaded] = useState(false);

  const wrapperProps = useSpring({opacity: 1, from: {opacity: 0}});

  useEffect(() => {
    const fetchCast = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${showData.id}/credits?api_key=${key}&language=en-US`
      );
      const data = await res.json();
      const cast = data.cast.sort((a, b) => (a.order > b.order ? 1 : -1));
      setCast(cast);
      setCastLoaded(true);
    };
    fetchCast();
  }, [showData.id]);

  return (
    <InfoWrapper style={wrapperProps}>
      <Overview>
        <h1>{showData.original_title}</h1>
        <p>{showData.overview}</p>
      </Overview>
      <h3>Cast</h3>
      {castLoaded && (
        <CastList>
          {cast.map(member => (
            <div key={member.id}>
              <CastImage
                background={`https://image.tmdb.org/t/p/w185/${member.profile_path}`}
              />
              <h4>{member.name}</h4>
              <p>{member.character}</p>
            </div>
          ))}
        </CastList>
      )}
    </InfoWrapper>
  );
};

const InfoWrapper = styled(animated.div)`
  width: 65%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Overview = styled.div`
  margin-bottom: 30px;
`;

const CastList = styled.div`
  display: flex;
  overflow: scroll;
  div {
    margin-right: 15px;
  }
`;

const CastImage = styled.div`
  background-image: ${props => `url(${props.background})`};
  background-position: center;
  background-size: cover;
  width: 150px;
  height: 150px;
  border-radius: 75px;
`;
export default MovieInfoPanel;
