import React from 'react';
import Search from '@material-ui/icons/Search';
import { Icon } from '../Common/Icon';
import { SearchContext } from '../../Context/Contexts';

class HeaderSearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  render() {
    const SearchIcon = Icon(Search);
    return (
      <div className="headerSearchBar">
        <SearchIcon />
        <SearchContext.Consumer>
          {({ text, changeText }) => (
            <input
              type="text"
              className="headerSearchBar__input"
              placeholder="Search for a configuration..."
              maxLength={10}
              onChange={event => changeText(event.target.value)}
            />
          )}
        </SearchContext.Consumer>
      </div>
    );
  }
}

export default HeaderSearchBar;
