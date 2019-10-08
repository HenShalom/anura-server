import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ConfigSettingsContext } from '../../Context/Contexts';
import { CONFIG_TYPE } from '../../Constant/constants';
import Select from './components/BorderSelect';

export default class SettingsDialog extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <ConfigSettingsContext.Consumer>
        {({ open, toggleMenu, changeSettings, settings }) => (
          <Dialog open={open} onClose={toggleMenu} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Config Setting</DialogTitle>
            <Select
              value={this.state.type || settings.type}
              name="config type"
              options={CONFIG_TYPE}
              handleChange={this.handleChange('type')}
            />

            <DialogActions>
              <Button onClick={toggleMenu} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  changeSettings(this.state);
                  toggleMenu();
                }}
                color="primary"
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </ConfigSettingsContext.Consumer>
    );
  }
}
