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

import Axios from 'axios';

const styles = {
    holdingtable : {
      paddingBottom: 50
    }
  }
class CoinCardClass extends Component {
    constructor(props){
        super(props);
        this.state = { board: [ ] , modalOpen: false, userSelected:null }
      }
    
      openTradeHistory(){
        this.setState({modalOpen:true});
        console.log("openTradeHistory")
      }
      closeTradeHistory(){
        console.log("First" + this.state.modalOpen);
        this.setState({modalOpen:false}, () => {
            console.log("Should be false now", this.state.modalOpen)
        });
        console.log("Second" + this.state.modalOpen);
      }
    render(){
        console.log(this.state);
        return (
            <>
         <TableRow onClick={ () => this.openTradeHistory()} key={this.props.id}>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.totalPortfolioValue}</TableCell>
                </TableRow>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.modalOpen}
                  onClose={() => this.closeTradeHistory()}
                >
                  <div>
                    <TradeHistory
                     onClick={() => {
                         this.closeTradeHistory();
                        }
                     }
                     userid={this.props.name}
                    />
                  </div>
                </Modal>
                                                
        </>
        );
    }
    }

CoinCardClass.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CoinCardClass);