import React from 'react';

export const Icon = WrappedCompnent => {
  return class Icon extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        hover: false
      };
    }

    render() {
      return (
        <span
          onClick={this.props.onClick}
          className={this.props.className}
          onMouseOver={this.props.onMouseOver}
          onMouseLeave={this.props.onMouseLeave}
        >
          <WrappedCompnent />
        </span>
      );
    }
  };
};
