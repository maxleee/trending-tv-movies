import React, {Component} from 'react';

export default class Icon extends Component {
  static defaultProps = {
    color: 'black'
  };
  render() {
    switch (this.props.name) {
      case 'close':
        return (
          <svg
            x='0px'
            y='0px'
            width='18px'
            height='18px'
            viewBox='0 0 31.11 31.11'
            enableBackground='new 0 0 31.11 31.11'
          >
            <polygon
              fill={this.props.color}
              points='31.11,1.41 29.7,0 15.56,14.14 1.41,0 0,1.41 14.14,15.56 0,29.7 1.41,31.11 15.56,16.97   29.7,31.11 31.11,29.7 16.97,15.56 '
            />
          </svg>
        );
      case 'menu':
        return (
          <svg
            data-icon='bars'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
          >
            <path
              fill={this.props.color}
              d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'
            />
          </svg>
        );
    }
  }
}
