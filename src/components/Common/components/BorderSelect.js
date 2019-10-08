import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classNames from 'classnames';

const styles = theme => ({
  formControl: {
    marginTop: '2vh',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  root: {}
});

function transformOptions(options) {
  if (typeof options[0] === 'string')
    return options.map(value => {
      return { value, label: value };
    });
}

class BorderSelect extends React.Component {
  state = {
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  render() {
    const { classes, value, options, name } = this.props;
    return (
      <FormControl variant="outlined" className={classNames(classes.formControl, classes.root)}>
        <InputLabel
          ref={ref => {
            this.InputLabelRef = ref;
          }}
          htmlFor="outlined-age-simple"
        >
          {name}
        </InputLabel>
        <Select
          value={value || ''}
          onChange={this.props.handleChange}
          input={
            <OutlinedInput labelWidth={this.state.labelWidth} name="age" id="outlined-age-simple" />
          }
        >
          {transformOptions(options).map(({ value, label }, key) => (
            <MenuItem key={key} value={value}>
              {' '}
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

BorderSelect.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default withStyles(styles)(BorderSelect);
