import React, { Component } from 'react';
import styled from 'styled-components';

import Show from './Show';
import { Transition } from 'react-spring/renderprops';

class ShowList extends Component {
  render() {
    const useCategory =
      this.props.category === 'tv' ? this.props.tv : this.props.movies;
    return (
      <ShowGrid>
        {useCategory.map(show => (
          <Transition
            items={show}
            from={{ opacity: 0, transform: 'scale(0.8)' }}
            enter={{ opacity: 1, transform: 'scale(1)' }}
            leave={{ opacity: 0, transform: 'scale(0.8)' }}
          >
            {show => props => <Show key={show.id} show={show} style={props} />}
          </Transition>
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
