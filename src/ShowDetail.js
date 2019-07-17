import React, { Component } from 'react';
import styled from 'styled-components';
import { Poster } from './Show';

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
    const { show } = this.state;
    return (
      <ShowWrapper backdrop={`${BACKDROP_PATH}${show.backdrop_path}`}>
        <ShowInfo>
          <Poster src={`${POSTER_PATH}${show.poster_path}`} alt="" />
          <div>
            <h1>{this.state.show.name}</h1>
            <h3>
              {this.state.show.number_of_seasons} Seasons <br />
              {this.state.show.number_of_episodes} Episodes
            </h3>
            <p>{this.state.show.overview}</p>
          </div>
        </ShowInfo>
      </ShowWrapper>
    );
  }
}

export default ShowDetail;

const ShowWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;

const ShowInfo = styled.div`
  background: white;
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
