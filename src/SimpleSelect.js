import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 170,
    maxWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  state = {
    category: '',
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
          ref={ref => {
            this.InputLabelRef = ref;
          }}
          htmlFor="outlined-simple"
          >
          {this.props.label}
          </InputLabel>
          <Select
            value={this.state.category}
            onChange={this.handleChange}
            input={
              <OutlinedInput
              labelWidth={this.state.labelWidth}
              id="outlined-simple"
              />
            }
          >
            <MenuItem value="">
            <em>General</em>
            </MenuItem>
            <MenuItem value={10}>Accessories</MenuItem>
            <MenuItem value={20}>Camera</MenuItem>
            <MenuItem value={30}>Speakers</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
