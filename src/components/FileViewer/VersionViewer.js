import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { getMaxVersion, getMaxVersionIndex } from './VersionHelpers';
import { ConfigSettingsContext } from '../../Context/Contexts';
import EditActions from './EditActions';
import { VersionViewer as styles } from './styles';
import '../Common/braceImport';
import VersionTab from './VersionTab';
import { UPDATE_CONFIG } from '../../Constant/GqlQueries';

class VersionViewer extends React.PureComponent {
  constructor(props) {
    super(props);
    const maxVersion = getMaxVersion(props.configs);
    const value = getMaxVersionIndex(maxVersion, props.configs);
    this.state = {
      edit: false,
      maxVersion,
      value,
      changeData: props.configs[value].data,
      type: props.configs[value].type
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const maxVersion = getMaxVersion(this.props.configs);
      const value = getMaxVersionIndex(maxVersion, this.props.configs);
      this.setState({
        maxVersion,
        value,
        edit: false,
        changeData: this.props.configs[value].data,
        type: this.props.configs[value].type
      });
    }
  }

  handleChange = (event, value) => {
    this.setState({
      value,
      changeData: this.props.configs[value].data
    });
  };

  setEditMode = index => {
    this.setState({
      edit: true,
      changeData: this.props.configs[index].data
    });
  };

  cancelUpdate = () => {
    this.setState({
      edit: false
    });
  };

  updateData = changeData => {
    this.setState({ changeData });
  };

  saveEdit = () => {
    this.cancelUpdate();
    this.props.refetch();
  };

  mutationRendering = (data, error) => {
    if (!data || !this.state.edit) return;
    if (data.updateConfig.success) {
      toast.success('update config');
      this.saveEdit();
    } else {
      toast.error(data.updateConfig.error);
    }
  };

  render() {
    const { classes, configs, serviceName, envName } = this.props;
    const { value, maxVersion, changeData, type } = this.state;
    const index = value >= configs.length ? configs.length - 1 : value;
    return (
      <>
        <VersionTab
          handleChange={this.handleChange}
          currentIndex={index}
          maxVersion={maxVersion}
          configs={configs}
        />
        <Grid item xs={12} sm={12} className={classes.viewer}>
          <ConfigSettingsContext.Consumer>
            {({ settings, toggleMenu, changeSettings }) => (
              <Mutation mutation={UPDATE_CONFIG}>
                {(updateConfig, { data, error }) => {
                  this.mutationRendering(data, error);
                  return (
                    <div className={classes.container}>
                      {this.state.edit ? (
                        <EditActions
                          changeData={changeData}
                          changeSettings={changeSettings}
                          updateConfig={updateConfig}
                          serviceName={serviceName}
                          envName={envName}
                          toggleMenu={toggleMenu}
                          settings={settings}
                          type={type}
                        />
                      ) : (
                        <IconButton
                          className={classes.editButton}
                          aria-label="Edit"
                          onClick={() => this.setEditMode(index)}
                        >
                          <Edit />
                        </IconButton>
                      )}
                      <AceEditor
                        readOnly={!this.state.edit}
                        height="100%"
                        width="100%"
                        mode={type.toLowerCase()}
                        theme="github"
                        value={changeData}
                        onChange={this.updateData}
                        name="DATA_DIV"
                      />
                    </div>
                  );
                }}
              </Mutation>
            )}
          </ConfigSettingsContext.Consumer>
        </Grid>
      </>
    );
  }
}

VersionViewer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VersionViewer);
