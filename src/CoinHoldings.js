import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import SellBox from './SellBox';

import Axios from 'axios';
const styles = {
  holdingtable : {
    paddingBottom: 50
  }
}

class CoinHoldings extends Component {
  constructor(props){
    super(props);
    this.state = { holdings: [ ] }
  }
  async componentDidMount(){
    const prices = await Axios.get('/api/prices').then( results => results.data );

    Axios.get('/holdings')
    .then(results => {
      const newHoldings = results.data.map( (result,id) => {
        const valueOfCoinHolding = prices[result.currency.name].USD * result.quantity;
        return {
          id: id,
          name: result.currency.name,
          quantity: result.quantity,
          value: valueOfCoinHolding
        }
      })
      this.setState({holdings: newHoldings})
    })
  }
  render() {
    const {classes} = this.props;
    return (
      <Grid container className={classes.holdingtable} alignItems="center" justify="center">
        <Grid item xs={8}>
        <Typography variant="h2" gutterBottom>
        Your Portfolio
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Sell Coin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {this.state.holdings.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell><SellBox name={row.name}></SellBox></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Paper>
        </Grid>
      </Grid>
    );
  }
}
CoinHoldings.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CoinHoldings);
