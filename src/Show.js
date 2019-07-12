import React from 'react';

class Movie extends React.Component {
  render() {
    return <div>{this.props.show.name}</div>;
  }
}

export default Movie;
