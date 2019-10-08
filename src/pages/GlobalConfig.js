import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Query, Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { GET_GLOBAL_VAR, UPDATE_GLOBAL_VARIABLE } from '../Constant/GqlQueries';
import GlobalConfigTable from '../components/GlobalConfig/GlobalConfigTable';
import '../styles/components/GlobalVariable/GlobalVariable.scss';

const columns = [
  { title: 'Key', field: 'key' },
  { title: 'Value', field: 'value' },
  { title: 'Reference Count', field: 'count', editable: 'never' }
];

const styles = () => ({
  saveButton: {
    marginLeft: '10%'
  }
});

class GlobalVariable extends Component {
  state = {};

  parseData = data => {
    if (this.state.data) return this.state.data;
    if (!data || !data.getGlobalVariable) return [];
    return Object.entries(JSON.parse(data.getGlobalVariable)).map(([key, value]) => ({
      key,
      value,
      count: 'UnKnown'
    }));
  };

  makeGlobalVariable = () => {
    const globalVar = {};
    this.parseData(this.state.data).forEach(({ key, value }) => {
      globalVar[key] = value;
    });
    return { variables: { globalVariable: JSON.stringify(globalVar) } };
  };

  handleUpdate = (cache, res) => {
    const data = res ? res.data.updateGlobalVariable : {};
    if (data.error) toast.error('Failed to save Global-Config');
    if (data.success) {
      toast.success('Saved Global Config');
      this.setState({ update: false });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Query query={GET_GLOBAL_VAR}>
        {({ loading, error, data, refetch }) => {
          if (error) return <div>Error</div>;
          return (
            <div className="global-config-table">
              <GlobalConfigTable
                isLoading={loading}
                columns={columns}
                data={this.parseData(data)}
                updateData={data => {
                  this.setState({ data, update: true });
                }}
              />
              <Mutation mutation={UPDATE_GLOBAL_VARIABLE} update={this.handleUpdate}>
                {(updateGlobalVariable, { data, error }) => {
                  this.handleUpdate(data, error);
                  return (
                    <Button
                      size="large"
                      variant="outlined"
                      color={this.state.update ? 'secondary' : 'primary'}
                      className={classes.saveButton}
                      onClick={() => updateGlobalVariable(this.makeGlobalVariable())}
                    >
                      Save Config
                    </Button>
                  );
                }}
              </Mutation>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(GlobalVariable);
