import React, { Component } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { SelectFileContext } from '../../Context/Contexts';
import VersionViewer from './VersionViewer';
import Loading from '../Common/Loading';
import { GET_CONFIGS } from '../../Constant/GqlQueries';

const styles = theme => ({
  title: {
    padding: '30px'
  }
});

class FileViewer extends Component {
  getClassName = (selectedService, selectedEnvironment) => {
    if (selectedService && selectedEnvironment) return 'active';
    return 'disable';
  };

  render() {
    const { classes } = this.props;
    return (
      <SelectFileContext.Consumer>
        {({ selectedService, selectedEnvironment }) => (
          <div className={`file_viewer ${this.getClassName(selectedService, selectedEnvironment)}`}>
            {selectedService && selectedEnvironment && (
              <Query
                query={GET_CONFIGS}
                variables={{ serviceName: selectedService, envName: selectedEnvironment }}
              >
                {({ loading, error, data, refetch }) => {
                  if (loading) return <Loading />;
                  if (error)
                    return (
                      <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        Error
                      </Typography>
                    );
                  if (data.getConfigs && data.getConfigs.configs)
                    return (
                      <VersionViewer
                        refetch={refetch}
                        serviceName={selectedService}
                        envName={selectedEnvironment}
                        configs={data.getConfigs.configs}
                      />
                    );
                  return <div>No configs</div>;
                }}
              </Query>
            )}
          </div>
        )}
      </SelectFileContext.Consumer>
    );
  }
}

FileViewer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FileViewer);
