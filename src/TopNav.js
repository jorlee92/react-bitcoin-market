import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function TopNav(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <p>Something</p>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Home
          </Typography>
          <Button color="inherit">Login</Button>
          <Avatar alt="Remy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/2/2e/RAS_SJohnRoss.jpg" className={classes.avatar} />

        </Toolbar>
      </AppBar>
    </div>
  );
}

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopNav);