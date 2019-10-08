import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { INIT_CONFIG } from '../../../Constant/constants';
import ConfigDetails from './ConfigDetails';
import Editor from './Editor';

export default class ConfigContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configFile: (props.config ? props.config.configFile : undefined) || INIT_CONFIG
    };
  }

  updateConfig = config => {
    this.setState({
      configFile: config
    });
  };

  addConfigCallback = config => {
    // no config error
    this.props.addConfigCallback({
      ...config,
      configFile: this.state.configFile
    });
    this.setState({ configFile: {} });
  };

  getConfig() {
    const { config } = this;
    if (this.state.configFile === undefined && config)
      return config.configFile ? config.configFile : INIT_CONFIG;
    return this.state.configFile;
  }

  render() {
    const { config, editedID } = this.props;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12} sm={4}>
          <ConfigDetails
            cancel={this.props.cancel}
            cancelable={this.props.cancelable}
            editedID={editedID}
            config={config}
            addConfigCallback={this.addConfigCallback}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Editor configFile={this.getConfig()} updateConfigFile={this.updateConfig} />
        </Grid>
      </Grid>
    );
  }
}
