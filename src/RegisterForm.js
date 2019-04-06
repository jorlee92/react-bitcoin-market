import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Component } from 'react';
import Axios from 'axios';

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });
  
  
class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            fname:"",
            lname:"",
            email:"",
            password:""
        };
    }
  render(){
    const { classes } = this.props;
    const submitReg = (first, last, email, password) => {
      let params = new URLSearchParams();
      params.append('first', first);
      params.append('last', last);
      params.append('email', email);
      params.append('password', password);
        Axios.post('/users/register', params)
        .then(result => console.log(result)).then(() => {
            //Take the user to the login page, provided their request was good.
            // document.location.reload()
            // window.location = "/login"
            window.location = "/"
        })
      }
    return (
        <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="first">First Name</InputLabel>
              <Input id="first" name="first" value={this.state.fname} onChange={(e) => this.setState({fname: e.target.value})}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="last">Last Name</InputLabel>
              <Input id="last" name="last" value={this.state.lname} onChange={(e) => this.setState({lname: e.target.value})}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} autoComplete="current-password" />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                  e.preventDefault();
                  submitReg(this.state.fname, this.state.lname, this.state.email, this.state.password)
              }}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
      );
  }
}

RegisterForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(RegisterForm);