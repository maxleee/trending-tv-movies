import React, { Component } from 'react';
import styled from 'styled-components';
import { Poster } from './Show';
import Overdrive from 'react-overdrive';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w342/';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280/';

class ShowDetail extends Component {
  state = {
    show: {},
  };

  async componentDidMount() {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/tv/${
          this.props.match.params.id
        }?api_key=3c5dee1740e9688bb656d073abfb0126&language=en-US`,
      );
      const show = await result.json();

      this.setState({
        show,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  render() {
    const showId = this.props.match.params.id;
    const showIndex = this.props.tv.findIndex(show => show.id == showId);
    const show = this.props.tv[showIndex];
    return (
      <ShowWrapper backdrop={`${BACKDROP_PATH}${show.backdrop_path}`}>
        <Overdrive id={show.id}>
          <ShowHeader>
            <img
              src={`${BACKDROP_PATH}${show.backdrop_path}`}
              alt={`${show.name} Backdrop`}
            />
          </ShowHeader>
        </Overdrive>
        <ShowInfo>
          <Poster src={`${POSTER_PATH}${show.poster_path}`} alt="" />
          <div>
            <h1>{show.name}</h1>
            <h3>
              {show.number_of_seasons} Seasons <br />
              {show.number_of_episodes} Episodes
            </h3>
            <p>{show.overview}</p>
          </div>
        </ShowInfo>
      </ShowWrapper>
    );
  }
}

export default ShowDetail;

const ShowWrapper = styled.div`
  position: relative;
`;

const ShowHeader = styled.div`
  width: 100%;
  height: 40vh;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  img {
    width: 100vw;
  }
`;

const ShowInfo = styled.div`
  background: #222;
  color: white;
  text-align: left;
  padding: 1rem 10%;
  display: flex;
  > div {
    margin-left: 40px;
  }
  img {
    position: relative;
    top: -15rem;
  }
`;
