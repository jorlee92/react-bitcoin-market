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

import Axios from 'axios';
import CommentSection from './CommentSection';

const styles = {
    holdingtable : {
      paddingBottom: 50
    }
  }
class CoinCardClass extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            trades: []
        };
    }
    async componentDidMount(){
        Axios.get('/trades/user/' + this.props.userid).then(results => {
            this.setState({trades: results.data});
        })
    }
    render(props){
        return (
        <>
        <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
        <Grid style={{marginTop:"20px"}} container alignItems="center" justify="center">
        <Grid item xs={9}>
        <Typography style={{color:"white"}} variant="h5">
        Trade History
        </Typography>
        </Grid>
        <Typography onClick={() => this.props.onClick()} style={{color:"white"}} variant="h5">
        [Close]
        </Typography>
        </Grid>
        <Paper>
        <Grid container alignItems="center" justify="center">
        <Grid item xs={4}>
        <CommentSection name="jordan" />
        </Grid>
        <Grid item xs={8} >
        <Table>
            <TableHead>
                <TableRow>
                <TableCell>Coin</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Value</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.trades.map(row => (
                <TableRow key={row.id}>
                    <TableCell>{row.currency.name}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.pricepaid}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </Grid>
        
        </Grid>
            {/* <Table>
            <TableHead>
                <TableRow>
                <TableCell>Coin</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Value</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.trades.map(row => (
                <TableRow key={row.id}>
                    <TableCell>{row.currency.name}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.pricepaid}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table> */}
            </Paper>
            </Grid>
        </Grid>
        </>
        );
    }
    }

CoinCardClass.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CoinCardClass);