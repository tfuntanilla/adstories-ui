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
    minWidth: 200,
    maxWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  state = {
    item: '',
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = event => {
    this.setState({ item: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const menuItems = this.props.menuItems;
    const name = this.props.name;

    const menuItemsList = []
    menuItems.forEach(function(item) {
      menuItemsList.push(
        <MenuItem value={item}>{item}</MenuItem>)
    });

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
            value={this.state.item}
            onChange={this.handleChange}
            name={name}
            input={
              <OutlinedInput
              labelWidth={this.state.labelWidth}
              id="outlined-simple"
              />
            }
          >
            {menuItemsList}
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
