import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                    <Link to="/">
                      <li onClick={() => this.onClick('tv')}>Trending TV</li>
                    </Link>
                    <Link to="/">
                      <li onClick={() => this.onClick('movie')}>
                        Trending Movies
                      </li>
                    </Link>
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

  @media (max-width: 600px) {
    width: 75%;
  }
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
    font-weight: 300;
    margin-bottom: 1rem;
  }
  a {
    text-decoration: none;
    color: white;
  }
`;
