import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
// icons
import Apps from '@material-ui/icons/Apps';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { SelectFileContext } from '../../Context/Contexts';
import EnvList from './EnvList';

const HIGHLIGHT_STYLE = { backgroundColor: 'yellow' };

function generateTitle(heightLightText, text) {
  if (!heightLightText || !text) return text;
  const splitText = text.split(new RegExp(`(${heightLightText})`, 'gi'));
  if (splitText.length === 1) return text;
  return (
    <div>
      {splitText.map((value, key) => {
        return (
          <span key={key} style={value === heightLightText ? HIGHLIGHT_STYLE : {}}>
            {value}
          </span>
        );
      })}
    </div>
  );
}

class ServiceItem extends React.Component {
  state = {
    open: false
  };

  handleClick = (clickFile, selectedService) => {
    this.setState(state => ({ open: !state.open }));
    clickFile(selectedService, '');
  };

  render() {
    const { searchText } = this.props;
    const { name, description, environments } = this.props.service;
    return (
      <SelectFileContext.Consumer>
        {({ clickFile, selectedService, selectedEnvironment }) => (
          <div>
            <ListItem button onClick={() => this.handleClick(clickFile, name)}>
              <ListItemIcon>
                <Apps />
              </ListItemIcon>
              <ListItemText
                primary={generateTitle(searchText, name)}
                secondary={generateTitle(searchText, description)}
              />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <EnvList
              open={this.state.open}
              environments={environments}
              isSelected={selectedService === name}
              ServiceName={name}
              selectedEnvironment={selectedEnvironment}
              clickFile={envName => clickFile(name, envName)}
            />
            <Divider />
          </div>
        )}
      </SelectFileContext.Consumer>
    );
  }
}

export default ServiceItem;
