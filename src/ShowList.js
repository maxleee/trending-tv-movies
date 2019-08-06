import React, { Component } from 'react';
import styled from 'styled-components';

import Show from './Show';

class ShowList extends Component {
  render() {
    return (
      <ShowGrid>
        {this.props.tv.map(show => (
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
