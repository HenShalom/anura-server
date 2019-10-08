import React, { Component } from 'react';
import { SearchContext } from './Contexts';

export default class SearchContextProvider extends Component {
  state = {
    searchText: ''
  };

  changeText = text => this.setState({ searchText: text });

  render() {
    const value = {
      text: this.state.searchText,
      changeText: this.changeText
    };
    return <SearchContext.Provider value={value}>{this.props.children}</SearchContext.Provider>;
  }
}
