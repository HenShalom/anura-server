import React, { Component } from 'react';
import { SelectFileContext } from './Contexts';

export default class SelectFileContextProvider extends Component {
  state = {
    selectedService: '',
    selectedEnvironment: ''
  };

  clickFile = (selectedService, selectedEnvironment) => {
    this.setState({
      selectedService,
      selectedEnvironment
    });
  };

  render() {
    const value = {
      ...this.state,
      clickFile: this.clickFile
    };
    return (
      <SelectFileContext.Provider value={value}>{this.props.children}</SelectFileContext.Provider>
    );
  }
}
