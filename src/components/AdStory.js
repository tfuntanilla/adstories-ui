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
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    backgroundColor: '#FFFFFF'
  },
  boardContent: {
    width: 325,
    height: 500,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    overflow: 'hidden',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px
      ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`
  }
});

function AdStory(props) {
  const { classes } = props;

  const text = props.design.text;

  if (props.design.boardColor) {
      document.getElementById("AdStoryBoard")
        .setAttribute('style', 'background-color: ' + props.design.boardColor);
  }
  if (props.design.backgroundColor) {
      document.getElementById("AdStory")
        .setAttribute('style', 'background-color: ' + props.design.backgroundColor);
  }
  if (props.design.backgroundImage) {
      document.getElementById("AdStory")
        .setAttribute('style', 'background-image: ' + props.design.backgroundImage);
  }

  const fontColor = props.design.fontColor ? props.design.fontColor : "#000000"
  const fontSize = props.design.fontSize ? props.design.fontSize : 18
  const fontWeight = props.design.fontFace ? props.design.fontWeight : 700
  const textAlign = props.design.textAlign ? props.design.textAlign : 'center'

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item>
            <div className={classes.board} id="AdStoryBoard">
              <Grid container spacing={0} justify="center" alignItems="center">
                <Grid item>
                  <div className={classes.boardContent} id="AdStory">
                    <div align={textAlign}
                        style={{color: fontColor, fontSize: fontSize, fontWeight: 700}}>
                      {text === undefined ? "Your AdStory will appear here" : text}
                    </div>
                  </div>
                </Grid>
              </Grid>
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
