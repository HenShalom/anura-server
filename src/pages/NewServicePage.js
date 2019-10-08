import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import NewServiceStepper from '../components/NewServiceComponents/NewServiceStepper';
import ServiceDetails from '../components/NewServiceComponents/Service/ServiceDetails';
// eslint-disable-next-line max-len
import ServiceDetailsComplete from '../components/NewServiceComponents/Service/ServiceDetailsComplete';
import ConfigContainer from '../components/NewServiceComponents/config/ConfigContainer';
import FinishConfigList from '../components/NewServiceComponents/config/FinishConfigList';
import CompleteStep from '../components/NewServiceComponents/CompleteStep';
import STEPS from '../utils/StepsEnum';
import { ADD_SERVICE, UPDATE_SERVICE } from '../Constant/GqlQueries';

const styles = theme => ({
  root: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '90%',
    margin: '0 auto'
  }
});

function mapEnvironments(environments) {
  return environments.map(env => ({
    name: env.name,
    type: env.configs[0].type,
    configFile: env.configs[0].data
  }));
}

class NewServicePage extends React.Component {
  constructor(props) {
    super(props);
    const stateFromProps = this.stateFromProps(props);
    this.state = {
      service: {},
      serviceComplete: false,
      currentConfig: {},
      configs: [],
      step: STEPS.serviceDetails,
      ...stateFromProps
    };
  }

  stateFromProps(props) {
    const { service, step } = props;
    if (!service) return {};
    delete service.__typename;
    const configs = mapEnvironments(service.environments);
    return { step, service, configs, serviceComplete: true };
  }

  editConfig = key => {
    this.setState(p => ({
      editedID: key,
      currentConfig: p.configs[key],
      step: STEPS.configDetails
    }));
  };

  handleAddService = service => {
    this.setState({ service, serviceComplete: true, step: STEPS.configDetails });
  };

  reEditService = () => {
    this.setState({ serviceComplete: false, step: STEPS.serviceDetails });
  };

  addConfigCallback = config => {
    this.setState(p => {
      const { configs } = p;
      if (p.editedID !== undefined) configs[p.editedID] = config;
      else configs.push(config);
      return { configs, currentConfig: {}, step: STEPS.completeStep, editedID: undefined };
    });
  };

  cancelConfigEdit = () => {
    this.setState({ currentConfig: {}, step: STEPS.completeStep, editedID: undefined });
  };

  addEnvironment = () => {
    this.setState({
      step: STEPS.configDetails
    });
  };

  getConfigs = () => {
    return {
      environments: this.state.configs.map(i => ({
        name: i.name,
        config: {
          data: i.configFile,
          type: i.type
        }
      }))
    };
  };

  mutationRendering = (data, error) => {
    const key = this.props.service ? 'updateService' : 'newService';
    if (data && data[key] && data[key].success) {
      toast.success(`service ${this.props.service ? 'updated' : 'added'}`);
      this.props.history.push('/');
    }
    if (error) {
      if (data) toast.error(data[key].error);
      else toast.error(error.message);
    }
  };

  render() {
    const { step, service, currentConfig, configs, editedID } = this.state;
    const { classes } = this.props;
    const isNew = !this.props.service;
    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={3}>
            {this.state.serviceComplete ? (
              <>
                <ServiceDetailsComplete service={service} editService={this.reEditService} />
                {configs && configs.length !== 0 && (
                  <FinishConfigList
                    configs={configs}
                    editConfig={this.editConfig}
                    isUpdate={step !== STEPS.configDetails}
                  />
                )}
              </>
            ) : (
              <ServiceDetails service={service} addServiceCallback={this.handleAddService} />
            )}
          </Grid>
          <Grid item xs={12} sm={9}>
            {step === STEPS.configDetails && (
              <ConfigContainer
                editedID={editedID}
                cancel={this.cancelConfigEdit}
                cancelable={configs.length !== 0}
                config={currentConfig}
                addConfigCallback={this.addConfigCallback}
              />
            )}
            {step === STEPS.completeStep && (
              <Mutation mutation={isNew ? ADD_SERVICE : UPDATE_SERVICE}>
                {(action, { data, error }) => {
                  this.mutationRendering(data, error);
                  return (
                    <CompleteStep
                      addEnvironment={this.addEnvironment}
                      complete={() => {
                        const variables = {
                          service: { ...service, ...this.getConfigs() }
                        };
                        if (!isNew) variables.originalName = this.props.service.name;
                        action({ variables });
                      }}
                    />
                  );
                }}
              </Mutation>
            )}
          </Grid>
        </Grid>
        <NewServiceStepper step={this.state.step} />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(NewServicePage));
