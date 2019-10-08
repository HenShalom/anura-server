import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Description from '@material-ui/icons/Description';
import { withRouter } from 'react-router-dom';
import AddItemListItem from './AddItemListItem';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

class EnvList extends React.Component {
  checkSelected = name => {
    return this.props.isSelected && this.props.selectedEnvironment === name;
  };

  render() {
    const { classes, environments, ServiceName } = this.props;
    return (
      <Collapse in={this.props.open} timeout="auto" unmountOnExit>
        <List component="div" className={classes.nested} disablePadding>
          <ListSubheader component="div">Environments</ListSubheader>
          <AddItemListItem
            onClick={() => this.props.history.push(`new-environment?serviceName=${ServiceName}`)}
            text="Add New Environment"
          />
          {environments.map(({ name }, key) => (
            <ListItem
              key={key}
              button
              selected={this.checkSelected(name)}
              onClick={() => this.props.clickFile(name, 1)}
            >
              <ListItemIcon>
                <Description />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    );
  }
}

EnvList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(EnvList));
