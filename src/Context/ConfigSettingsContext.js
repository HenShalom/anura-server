import React, { Component } from 'react';
import { ConfigSettingsContext } from './Contexts';

export default class ConfigSettingsContextProvider extends Component {
  state = {
    settings: {
      type: 'JSON'
    },
    open: false
  };

  changeSettings = data => {
    this.setState(p => ({ settings: Object.assign(p.settings, data) }));
  };

  toggleMenu = () => {
    this.setState(p => ({ open: !p.open }));
  };

  render() {
    const value = {
      ...this.state,
      changeSettings: this.changeSettings,
      toggleMenu: this.toggleMenu
    };
    return (
      <ConfigSettingsContext.Provider value={value}>
        {this.props.children}
      </ConfigSettingsContext.Provider>
    );
  }
}
