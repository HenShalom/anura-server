import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { buttonStyle as styles } from './styles';

class CompleteStep extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={8} className={classes.container}>
        <Grid item xs={12} sm={6} className={classes.container}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            classes={{ label: classes.buttonLabel }}
            size="large"
            onClick={this.props.addEnvironment}
          >
            Add Environment
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.container}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            classes={{ label: classes.buttonLabel }}
            size="large"
            onClick={this.props.complete}
          >
            Complete
          </Button>
        </Grid>
      </Grid>
    );
  }
}

CompleteStep.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(CompleteStep);
