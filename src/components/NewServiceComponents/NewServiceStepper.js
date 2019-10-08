import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

const styles = theme => ({
  root: {
    margin: '1vh 0'
  },
  button: {
    marginRight: theme.spacing()
  },
  completed: {
    display: 'inline-block'
  },
  instructions: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing()
  }
});

function getSteps() {
  return ['Create your service', 'Add Your Service Environments', 'Complete'];
}

class NewServiceStepper extends React.Component {
  render() {
    const { classes, step } = this.props;
    const steps = getSteps();

    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={step}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton completed={index < step}>{label}</StepButton>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

NewServiceStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(NewServiceStepper);
