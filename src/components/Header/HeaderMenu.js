import React from 'react';
import { withRouter } from 'react-router-dom';

function HeaderMenu(props) {
  const linkTo = route => () => props.history.push(`/${route}`);
  return (
    <div className="header-menu">
      <div className="header-item" role="button" tabIndex={0} onClick={linkTo('global-variable')}>
        Globals
      </div>
      <div className="header-item" role="button" tabIndex={0} onClick={linkTo('status')}>
        Status
      </div>
      <div className="header-item" role="button" tabIndex={0} onClick={linkTo('docs')}>
        Docs
      </div>
    </div>
  );
}

export default withRouter(HeaderMenu);
