import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddBox from '@material-ui/icons/AddBox';

const styles = theme => ({
  listItem: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.35)'
    }
  },
  listItemIcon: {
    color: theme.palette.secondary.contrastText
  },
  listItemText: {
    color: theme.palette.secondary.contrastText
  }
});

class AddItemListItem extends Component {
  render() {
    const { classes, text, onClick } = this.props;
    return (
      <div>
        <Divider />
        <ListItem
          onClick={onClick}
          classes={{ root: classes.listItem, focusVisible: classes.listItemFocuse }}
          button
        >
          <ListItemIcon classes={{ root: classes.listItemIcon }}>
            <AddBox />
          </ListItemIcon>
          <ListItemText primary={text} classes={{ primary: classes.listItemText }} />
        </ListItem>
        <Divider />
      </div>
    );
  }
}
export default withStyles(styles)(AddItemListItem);
