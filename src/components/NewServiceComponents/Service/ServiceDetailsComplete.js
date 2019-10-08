import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import { DetailsWindowComplete as styles } from '../styles';

class ServiceDetailsComplete extends React.Component {
  render() {
    const { classes, service } = this.props;

    return (
      <Paper className={classes.root} elevation={10}>
        <IconButton
          aria-label="Edit"
          className={classes.editButton}
          onClick={this.props.editService}
        >
          <Edit fontSize="small" />
        </IconButton>
        <Typography className={classes.title} variant="h3" color="inherit">
          {service.name}
        </Typography>
        <Typography
          className={classNames(classes.title, classes.description)}
          variant="subtitle1"
          color="inherit"
          paragraph
        >
          {service.description}
        </Typography>
        <Typography className={classes.title} variant="subtitle2" color="inherit">
          web hooks :
        </Typography>
        {service.webHook ? (
          <div className={classes.webHookContainer}>
            <Chip
              label={service.webHook.method}
              className={classes.chip}
              color="primary"
              variant="outlined"
            />
            <Typography className={classes.webHookText} variant="body1" color="inherit">
              {service.webHook.url}
            </Typography>
          </div>
        ) : (
          <Typography className={classes.noWebHookTitle} variant="subtitle1" color="inherit" noWrap>
            no web hooks
          </Typography>
        )}
      </Paper>
    );
  }
}

ServiceDetailsComplete.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ServiceDetailsComplete);
