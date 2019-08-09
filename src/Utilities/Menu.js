import React, {Component} from 'react';
import styled from 'styled-components';
import Portal from './Portal';
import Icon from './Icon';

export default class Menu extends Component {
  render() {
    const {toggle, on} = this.props;
    return (
      <Portal>
        {on && (
          <ModalWrapper>
            <ModalWindow>
              <CloseButton onClick={toggle}>
                <Icon name='close' color='#fff' />
              </CloseButton>
              <MenuList>
                <li>Trending TV</li>
                <li>Trending Movies</li>
              </MenuList>
            </ModalWindow>
          </ModalWrapper>
        )}
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
