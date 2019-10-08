import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Setting from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import AceEditor from 'react-ace';
import { JsonEditorStyle as styles } from '../styles';
import '../../Common/braceImport';
import { ConfigSettingsContext } from '../../../Context/Contexts';

class Editor extends React.Component {
  render() {
    const { classes, configFile } = this.props;
    return (
      <Paper className={classes.root} elevation={10}>
        <ConfigSettingsContext.Consumer>
          {({ toggleMenu, settings }) => (
            <>
              <IconButton className={classes.settingButton} aria-label="Edit" onClick={toggleMenu}>
                <Setting />
              </IconButton>
              <AceEditor
                id="json-viewer-id"
                height="70vh"
                width="100%"
                mode={settings.type.toLowerCase()}
                theme="github"
                value={configFile}
                onChange={data => this.props.updateConfigFile(data)}
                name="NEW_DIV"
              />
            </>
          )}
        </ConfigSettingsContext.Consumer>
      </Paper>
    );
  }
}

Editor.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Editor);
