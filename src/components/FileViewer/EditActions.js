import React, { Component } from 'react';
import Setting from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { EditActions as styles } from './styles';

class EditActions extends Component {
  render() {
    const {
      classes,
      changeData,
      updateConfig,
      serviceName,
      envName,
      toggleMenu,
      changeSettings,
      type
    } = this.props;
    return (
      <div>
        <IconButton
          className={classes.settingButton}
          aria-label="Edit"
          onClick={() => {
            changeSettings({ type });
            toggleMenu();
          }}
        >
          <Setting />
        </IconButton>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.cancel}
          onClick={this.cancelUpdate}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.saveChanges}
          onClick={() => {
            const variables = {
              serviceName,
              environmentName: envName,
              data: changeData,
              type
            };
            updateConfig({ variables });
          }}
        >
          Save changes
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(EditActions);
