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

import { Component } from 'react';
import Axios from 'axios';

const styles = {
    card: {
      maxWidth: 345,
      
    },
    media: {
      height: 140,
      backgroundSize: 'contain',
    },
    actions: {
        alignItems: 'center',
        maxWidth: '80%',
        margin: 'auto'
    }
  };
  
class CoinCardClass extends Component {
    submitOrder(COIN_NAME, NUMBER){
        if(NUMBER > 0){
            Axios.post('/api/action/buyCoin', { coin: COIN_NAME, amount: NUMBER})
            .then(result => { 
            console.log(result)
            this.setState({snackmsg: "Purchase Successful, reloading page", snackopen: true})
            return new Promise(resolve => setTimeout(() => resolve(), 3000));
            //refresh the page, provided the request was good.
            }).then(() => {
              // document.location.reload()
              window.location = "/"
            })
            .catch(() => {
              this.setState({snackmsg: "Unable to complete Purchase", snackopen: true})
            })
      }
    }
    handlesnackClose= () => {
      this.setState({snackopen: false})
    }
    constructor(props){
        super(props)
        this.state = {
            amount:0,
            snackopen: false,
            snackmsg: "Purchase Successful, reloading page"
        };
    }
  render(){
    const { classes } = this.props;

    return (
        <Paper>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={this.props.image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                { this.props.name }
              </Typography>
              <Typography component="p">
                { this.props.price }
              </Typography>
              
            </CardContent>
          </CardActionArea>
          <CardActions style={styles.actions}>
          <TextField
              id="standard-name"
              label="Amount"
              className={classes.textField}
              onChange={(e) => this.setState({amount: e.target.value})}
              value={this.state.amount}
              margin="normal"
            />
            <Button onClick={() => {this.submitOrder(this.props.name,this.state.amount)}} size="large" color="primary">
              Buy
            </Button>
          </CardActions>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackopen}
          autoHideDuration={6000}
          onClose={this.handlesnackClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackmsg}</span>}
        />
        </Paper>
      );
  }
}

CoinCardClass.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CoinCardClass);