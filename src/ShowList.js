import React, { Component } from 'react';
import styled from 'styled-components';

import Show from './Show';
import { Trail, config } from 'react-spring/renderprops';

class ShowList extends Component {
  render() {
    const useCategory =
      this.props.category === 'tv' ? this.props.tv : this.props.movies;
    return (
      <ShowGrid>
        <Trail
          native
          config={{ tension: 230, friction: 30 }}
          items={useCategory}
          keys={useCategory => useCategory.id}
          from={{ opacity: 0, transform: 'scale(0.8)' }}
          to={{ opacity: 1, transform: 'scale(1)' }}
        >
          {useCategory => props => (
            <Show key={useCategory.id} show={useCategory} style={props} />
          )}
        </Trail>
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
