import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useSpring, animated} from 'react-spring';
import {key} from './Utilities';

const TVInfoPanel = props => {
  const {showData} = props;
  const [cast, setCast] = useState([]);
  const [mainCast, setMainCast] = useState([])
  const [castLoaded, setCastLoaded] = useState(false);

  const wrapperProps = useSpring({opacity: 1, from: {opacity: 0}});

  useEffect(() => {
    const fetchCast = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${showData.id}/credits?api_key=${key}&language=en-US`
      );
      const data = await res.json();
      const cast = data.cast.sort((a, b) => (a.order > b.order ? 1 : -1));
      const mainCast = cast.slice(0,4);
      const subCast = cast.slice(4)
      setCast(subCast);
      setMainCast(mainCast)
      setCastLoaded(true);
    };
    fetchCast();
  }, [showData.id]);

  return (
    <InfoWrapper style={wrapperProps}>
      <Overview>
        <h1>{showData.name}</h1>
        <p>{showData.overview}</p>
      </Overview>
      <SeasonsWrap>
        {showData.seasons.map(season => {
          const airDate = new Date(season.air_date);
          return (
            <Season key={season.air_date}>
              <img
                src={`https://image.tmdb.org/t/p/w342/${season.poster_path}`}
                alt={season.name}
              />
              <div>
                <h3>{season.name}</h3>
                <p>{season.episode_count} Episodes</p>
                <p>{airDate.getFullYear()}</p>
              </div>
            </Season>
          );
        })}
      </SeasonsWrap>
      <h3>Cast</h3>
      {castLoaded && (
        <CastList>
          {mainCast.map(member => (
            <div key={member.id}>
              <CastImage
                background={`https://image.tmdb.org/t/p/w185/${member.profile_path}`}
                />
              <h4>{member.name}</h4>
              <p>{member.character}</p>
            </div>
                ))
              } 
          <div className="subCast">
            {cast.map(member => (
              <div className="castMember" key={member.name}>
              <h4>{member.name}</h4>
              <p>{member.character}</p>
              </div>
            ))}
          </div>
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

const SeasonsWrap = styled.div``;

const Season = styled.div`
  display: flex;
  margin-bottom: 40px;
  img {
    height: 200px;
  }
  div {
    margin-left: 30px;
  }
  
`;

const CastList = styled.div`
  display: flex;
  flex-wrap: wrap;
  div {
    margin-right: 1rem;
  }
  .subCast {
    width: 100%;
    margin-top: 1rem;
    .castMember {
      margin-top: 1rem;
    }
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
export default TVInfoPanel;
