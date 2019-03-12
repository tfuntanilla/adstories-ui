import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { generateAPI } from '../redux/Actions';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


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
    padding: theme.spacing.unit * 3,
  },
  toolbarTitle: {
    flex: 1,
  }
});

class Examples extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <PhotoAlbumIcon className={classes.icon}/>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Link to="/" style={{textDecoration: 'none', color: '#FFF', cursor: 'pointer'}}>
              AdStories
            </Link>
          </Typography>
          <Link to="/examples" style={{textDecoration: 'none', color: '#FFF'}}>
            <Button color="inherit">Examples</Button>
          </Link>
        </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
                Examples
              </Typography>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={8} justify="center">
            <Grid item xs={12}>
              <img src={require('../images/1.png')} alt="image1"/>
              <img src={require('../images/2.png')} alt="image2"/>
              <img src={require('../images/3.png')} alt="image3"/>
              <img src={require('../images/4.png')} alt="image4"/>
              <img src={require('../images/5.png')} alt="image5"/>
              <img src={require('../images/6.png')} alt="image6"/>
            </Grid>
          </Grid>
          </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            The End.
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

Examples.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
  status: store.Reducer.status,
  design: store.Reducer.results
});

const mapDispatchToProps = dispatch => ({
  generate: requestBody => dispatch(generateAPI(requestBody))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Examples));
