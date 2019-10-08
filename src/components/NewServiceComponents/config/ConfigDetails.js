import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { DetailsWindow as styles } from '../styles';
import WebHookDetails from '../WebHookDetails';
import { ConfigSettingsContext } from '../../../Context/Contexts';

class ConfigDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.config
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClick = type => {
    this.props.addConfigCallback(Object.assign(this.state, { type }));
  };

  webHookUpdate = value => {
    this.setState({
      webHook: value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classNames(classes.root, classes.envRoot)} elevation={15}>
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
          Config
        </Typography>
        <TextField
          id="outlined-name"
          label="Environment Name"
          className={classNames(classes.textField, classes.nameField)}
          value={this.state.name || ''}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <WebHookDetails webHook={this.state.webHook || {}} webHookUpdate={this.webHookUpdate} />
        <div className={classes.buttonContainer}>
          <ConfigSettingsContext.Consumer>
            {({ settings }) => (
              <Button
                onClick={() => this.handleClick(settings.type)}
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                {this.props.editedID !== undefined ? 'Update' : 'Create'}
              </Button>
            )}
          </ConfigSettingsContext.Consumer>
          {this.props.cancelable && (
            <Button
              onClick={this.props.cancel}
              variant="outlined"
              color="secondary"
              className={classes.button}
            >
              Cancel
            </Button>
          )}
        </div>
      </Paper>
    );
  }
}

ConfigDetails.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ConfigDetails);
