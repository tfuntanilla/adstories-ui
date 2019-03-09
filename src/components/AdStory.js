import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  board: {
    width: 800,
    height: 600,
    backgroundColor: '#FFFFFF'
  },
  boardContent: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  }
});

function AdStory(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item>
            <div className={classes.board}>
              <div className={classes.boardContent} id="AdStoryBoard">
                <Typography variant="h6" align="center" gutterBottom>
                  Your AdStory will appear here.
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </main>
    </React.Fragment>
  );
}

AdStory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdStory);
