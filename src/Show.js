import React from 'react';
import PropTypes from 'prop-types';

class Show extends React.Component {
  static propTypes = {
    show: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {};
  render() {
    return (
      <div>
        <h3>{this.props.show.name}</h3>
        <p>{this.props.desc}</p>
      </div>
    );
  }
}

export default Show;
