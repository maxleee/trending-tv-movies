import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const TVInfoPanel = props => {
  const {showData} = props;
  const [cast, setCast] = useState([]);
  const [castLoaded, setCastLoaded] = useState(false);

  const fetchCast = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${showData.id}/credits?api_key=3c5dee1740e9688bb656d073abfb0126&language=en-US`
    );
    const data = await res.json();
    const cast = data.cast.sort((a, b) => (a.order > b.order ? 1 : -1));
    setCast(cast);
    setCastLoaded(true);
  };

  useEffect(() => {
    fetchCast();
  }, [showData.id]);

  return (
    <div>
      <h1>{showData.name}</h1>
      <h3>{showData.number_of_seasons} Seasons</h3>
      <p>{showData.overview}</p>
      <h3>Cast</h3>
      {castLoaded && (
        <CastList>
          {cast.map(member => (
            <div>
              <CastImage
                background={`https://image.tmdb.org/t/p/w185/${member.profile_path}`}
              />
              <h4>{member.name}</h4>
              <p>{member.character}</p>
            </div>
          ))}
        </CastList>
      )}
    </div>
  );
};

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
export default TVInfoPanel;
