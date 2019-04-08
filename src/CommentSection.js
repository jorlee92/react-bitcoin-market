import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Component } from 'react';
import Table from '@material-ui/core/Table';
import Modal from '@material-ui/core/Modal';
import TradeHistory from './TradeHistory';
import Avatar from '@material-ui/core/Avatar';

import Axios from 'axios';

const styles = {
    holdingtable : {
      paddingBottom: 50
    }
  }

  const SingleComment = (props) => {
    return (
      <Grid style={{border: "1px solid gray"}} container>
      <Grid item xs={3}>
          <Avatar style={{width:"90%", height:"90%", margin: "auto"}}>{props.name.charAt(0)}</Avatar>
      </Grid>
      <Grid item xs={9}>
      <p>{props.text}</p>
      </Grid>
      </Grid>
    )
}
class CoinCardClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment:""
        }
      }

    render(){
        return (
            <>
            <SingleComment name="jordan" text="lorem ipsum dollorem ipsum dollorem ipsum dollorem ipsum dollorem ipsum dollorem ipsum dollorem ipsum dollorem ipsum dollorem
                 ipsum dol" />
        <TextField
          style={{width:"100%"}}
          id="new-comment"
          label="Comment"
          value={this.state.name}
          onChange={(e) => this.setState({comment:e.target.value})}
          onKeyPress={(e) => {
              //https://github.com/mui-org/material-ui/issues/5393#issuecomment-304707345
              if(e.key == 'Enter'){
                  console.log("Enter key pressed")
              }
          }}
          margin="normal"
          variant="outlined"
        />
            </>
        );
    }
}

CoinCardClass.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CoinCardClass);