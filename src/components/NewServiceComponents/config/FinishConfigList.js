import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Description from '@material-ui/icons/Description';
import Edit from '@material-ui/icons/Edit';
import { configListStyle as styles } from '../styles';

class FinishConfigList extends React.Component {
  render() {
    const { classes, configs } = this.props;
    return (
      <Paper elevation={10} className={classes.root}>
        <List
          component="div"
          disablePadding
          subheader={<ListSubheader component="div">Configs</ListSubheader>}
        >
          {configs.map(({ name }, key) => (
            <ListItem key={key} button>
              <ListItemIcon>
                <Description />
              </ListItemIcon>
              <ListItemText primary={name} />
              {this.props.isUpdate && (
                <ListItemSecondaryAction>
                  <IconButton aria-label="Edit" onClick={() => this.props.editConfig(key)}>
                    <Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

FinishConfigList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(FinishConfigList);
