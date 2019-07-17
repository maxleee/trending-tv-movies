import React, {Component} from 'react';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154/';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280/';

class ShowDetail extends Component {
  state = {
    show: {}
  };

  async componentDidMount() {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/tv/${
          this.props.match.params.id
        }?api_key=3c5dee1740e9688bb656d073abfb0126&language=en-US`
      );
      const show = await result.json();

      this.setState({
        show
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  render() {
    const {show} = this.state;
    return (
      <div>
        <img src={`${BACKDROP_PATH}${show.backdrop_path}`} alt='' />
        <img src={`${POSTER_PATH}${show.poster_path}`} alt='' />
        <h1>{this.state.show.name}</h1>
        <h3>
          {this.state.show.number_of_seasons} Seasons,{' '}
          {this.state.show.number_of_episodes} Episodes
        </h3>
        <p>{this.state.show.overview}</p>
      </div>
    );
  }
}

export default ShowDetail;
