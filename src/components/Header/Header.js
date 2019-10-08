import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderSearchBar from './HeaderSearchBar';
import HeaderMenu from './HeaderMenu';

function SearchAppBar(props) {
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo" onClick={() => props.history.push('/')}>
          <img alt="" src="/img/001-frog.svg" className="header__logo_img" />
          <span className="header__title" role="button" tabIndex={0}>
            Anura
          </span>
        </div>
        <HeaderMenu />
      </div>
      <HeaderSearchBar />
    </div>
  );
}

export default withRouter(SearchAppBar);
