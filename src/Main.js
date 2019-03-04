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
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const stories = {
  width: 500,
  height: 500,
  backgroundImage: "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)"
}

function Main(props) {
  const { classes } = props;
  const products = ["Instant Pot"]
  const events = ["Day-based", "Black Friday", "Christmas"]

  const eventMap = {
    "day-based": "day_based"
  }

  function handleClick() {
    var text;
    var category = document.getElementsByName("event")[0].value;
    category = eventMap[category.toLowerCase()];
    fetch("http://localhost:5000/gen_text?category=" + category)
    .then(function(response) {
      response.text().then(function(text) {
        document.getElementById("text").innerHTML = text;
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
              Create promotional content for your product.
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Use the generator below to create samples.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={8} justify="center">
                <Grid item xs={4}>
                  <SimpleSelect label="Product" name='product' menuItems={products}/>
                </Grid>
                <Grid item xs={4}>
                  <SimpleSelect label="Event" name='event' menuItems={events}/>
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
          <Grid container spacing={40}>
            <div style={{width: stories.width, height: stories.height, backgroundImage: stories.backgroundImage}}>
            <div id="text"></div>
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
