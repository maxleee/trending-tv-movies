import React, { Component } from 'react';
import styled from 'styled-components';

import Show from './Show';

class ShowList extends Component {
  state = {
    tv: [],
  };

  async componentDidMount() {
    try {
      const result = await fetch(
        'https://api.themoviedb.org/3/trending/tv/week?api_key=3c5dee1740e9688bb656d073abfb0126',
      );
      const shows = await result.json();

      this.setState({
        tv: shows.results,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  render() {
    return (
      <ShowGrid>
        {this.state.tv.map(show => (
          <Show key={show.id} show={show} />
        ))}
      </ShowGrid>
    );
  }
}

export default ShowList;

const ShowGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1rem;
`;
