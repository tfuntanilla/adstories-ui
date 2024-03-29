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
import LinearProgress from '@material-ui/core/LinearProgress';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import AdStory from './AdStory';

import html2canvas from 'html2canvas';

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

class Home extends React.Component {

  state = {
    keywords: ''
  };

  _downloadImage() {
      let view = document.querySelector('#AdStory');

      html2canvas(view).then((canvas) => {
          let a = document.createElement('a');
          a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
          a.download = 'adstory.png';
          a.click();
      });
  }

  _generate() {
    const requestBody = this.state;
    this.props.generate(requestBody);
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  handleClick() {
    this._generate();
  }

  handleDownload() {
    this._downloadImage();
  }

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
                Promote your content with visual stories
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Get started
              </Typography>
              <div className={classes.heroButtons}>
                <TextField
                  id="outlined-full-width"
                  label="Keywords"
                  style={{ margin: 8 }}
                  placeholder="Name an event or leave this blank to generate a random example."
                  helperText="E.g. daily deals, black friday, prime day, or christmas."
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={this.state.keywords}
                  onChange={this.handleChange('keywords')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={() => this.handleClick()}>
                      Generate
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          {this.props.status === 'PENDING' ?
            <LinearProgress color="secondary" /> : ""}
            <div className={classNames(classes.layout, classes.cardGrid)}>
              <AdStory design={this.props.design}/>
              <br/>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => this.handleDownload()}>
                    Download
                  </Button>
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

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
  status: store.Reducer.status,
  design: store.Reducer.results
});

const mapDispatchToProps = dispatch => ({
  generate: requestBody => dispatch(generateAPI(requestBody))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
