import React from 'react';

export default class LoadingError extends React.PureComponent {
  render() {
    return (
      <div className="loadingError">
        <div className="loadingError__container">
          <h2 className="loadingError__header">Hey.</h2>
          <p className="loadingError__text">Sorry we couldn't load the configuration.</p>
        </div>
      </div>
    );
  }
}
