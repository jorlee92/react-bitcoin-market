import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';


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
  whiteText: {
    color: "white",
  },
  space: {
    justifyContent: "space-between"
  }
};

function TopNav(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.space}>
          <Link component={RouterLink} to="/leaderboard">
            <Typography variant="h6" color="inherit" className={classes.whiteText}>
                Leaderboard
            </Typography>
          </Link>
          <Link component={RouterLink} to="/">
            <Typography variant="h6" color="inherit" className={classes.whiteText}>
              Home
            </Typography>
          </Link>
          <Link component={RouterLink} to="/login">
            <Button className={classes.whiteText} color="inherit">Login</Button>
          </Link>
          <Link component={RouterLink} to="/profile">
            <Avatar alt="Remy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/2/2e/RAS_SJohnRoss.jpg" className={classes.avatar} />
          </Link>

        </Toolbar>
      </AppBar>
    </div>
  );
}

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopNav);