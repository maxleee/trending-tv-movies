import React, { Component } from 'react';
import styled from 'styled-components';
import { Portal } from 'Utilities';
import Icon from './Icon';

import { Transition } from 'react-spring/renderprops';

export default class Menu extends Component {
  onClick = function(value) {
    this.props.changeCategory(value);
    this.props.toggle();
  };
  render() {
    const { toggle, on } = this.props;
    return (
      <Portal>
        <Transition
          items={on}
          from={{ transform: 'translateX(-100%)', x: 0 }}
          enter={{ transform: 'translateX(0)', x: 1 }}
          leave={{ transform: 'translateX(-100%)', x: 0 }}
        >
          {on =>
            on &&
            (props => (
              <ModalWrapper style={{ opacity: props.x }}>
                <ModalWindow style={props}>
                  <CloseButton onClick={toggle}>
                    <Icon name="close" color="#fff" />
                  </CloseButton>
                  <MenuList>
                    <li onClick={() => this.onClick('tv')}>Trending TV</li>
                    <li onClick={() => this.onClick('movies')}>
                      Trending Movies
                    </li>
                  </MenuList>
                </ModalWindow>
              </ModalWrapper>
            ))
          }
        </Transition>
      </Portal>
    );
  }
}

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
`;

const ModalWindow = styled.div`
  position: relative;
  width: 20%;
  height: 100%;
  padding: 50px;
  background: rgba(0, 0, 10, 1);
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  li {
    font-size: 2rem;
    padding-bottom: 1rem;
    font-weight: 300;
  }
`;
