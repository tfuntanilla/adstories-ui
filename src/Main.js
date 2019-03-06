import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ComposedTextField from './ComposedTextField';
import SimpleSelect from './SimpleSelect';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 700,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    minWidth: 188,
    maxWidth: 188,
    minHeight: 100,
    maxHeight: 100
  },
  paper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  storyCard: {
    maxWidth: 250,
    maxHeight: 450,
    minWidth: 250,
    minHeight: 450,
  },
  storyText: {
    maxWidth: 250,
    maxHeight: 445,
    minWidth: 250,
    minHeight: 445,
    marginTop: 30,
    marginBottom: 30,
    marginRight: 10,
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 750,
    textAlign: "left"
  }
});

const stories = {
  backgroundImage: "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)"
}

const cards = [1, 2, 3, 4, 5];

function Main(props) {
  const { classes } = props;
  const events = ["Random", "Day of the week", "Christmas"]

  const eventMap = {
    "Random": "full_data",
    "Day of the week": "day_based",
    "Christmas": "christmas"
  }

  function handleClick() {

    var progress = document.getElementById("progress");
    progress.setAttribute("style", "display: visible");

    var text;
    var category = document.getElementsByName("event")[0].value;
    category = eventMap[category];
    if (category == undefined) {
      category = "full_data"
    }

    fetch("http://localhost:5000/gen_stories?category=" + category)
    .then(function(response) {
      response.json().then(function(body) {

        var storyText = document.getElementById("storyText");
        storyText.innerHTML = body.text;
        storyText.setAttribute("style", "color: " + body.fontColor +
                                        "; background-color: " + body.textBackgroundColor);

        var textPaper = document.getElementById("textPaper");
        textPaper.innerHTML = body.text;
        textPaper.setAttribute("style", "display: visible");

        var storyCard = document.getElementById("storyCard");
        storyCard.setAttribute("style", body.label + ": " + body.backgroundImage);

        var colorPalette = body.colorPalette;
        colorPalette.forEach(function(color, index) {
          var colorBox = document.getElementById("color" + (index + 1));
          colorBox.setAttribute("style", "background-color:" + color)
        });

        var progress = document.getElementById("progress");
        progress.setAttribute("style", "display: none");

      })
    })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <MovieFilterIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            AdStories
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
              Create promotional stories for your product.
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Use the generator below to create samples.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={8} justify="center">
                <Grid item xs={16}>
                  <SimpleSelect label="Ads for..." name='event' menuItems={events}/>
                </Grid>
              </Grid>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Button variant="contained" color="secondary" onClick={handleClick}>
                    Generate AdStories
                  </Button>
                </Grid>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <LinearProgress id="progress" style={{display: "none"}}/>
          <Grid container spacing={24} justify="center">
            <Grid item sm={12} md={12} lg={12}>
              <Paper className={classes.paper} id="textPaper" style={{display: "none"}}></Paper>
            </Grid>
            {cards.map(card => (
              <Grid item key={card} sm={6} md={4} lg={2}>
                <div className={classes.card} id={"color" + card}>
                </div>
              </Grid>
            ))}
            <div className={classes.stories} id="storyCard">
              <div className={classes.storyText}>
                  <span id="storyText"></span>
              </div>
            </div>
          </Grid>
        </div>
      </main>
    </React.Fragment>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
