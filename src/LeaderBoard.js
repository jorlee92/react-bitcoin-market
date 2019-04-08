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
import Modal from '@material-ui/core/Modal';


import Axios from 'axios';
import TradeHistory from './TradeHistory';
import TradeHistoryModal from './TradeHistoryModal';

const styles = {
  holdingtable : {
    paddingBottom: 50
  }
}
const sortByAmount = (function makeSortByAmount(){
  function compare(a,b) {
      if (a.totalPortfolioValue > b.totalPortfolioValue)
        return -1;
      if (a.totalPortfolioValue < b.totalPortfolioValue)
        return 1;
      return 0;
  }
  return (arr) => {
      arr.sort(compare);
  } 
})()

class CoinHoldings extends Component {
  constructor(props){
    super(props);
    this.state = { board: [ ] , modalOpen: false, userSelected:null }
  }
  async componentDidMount(){
    const prices = await Axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,LTC,EOS,BCH,USDT&tsyms=USD')
      .then( results => results.data).then(data => {
        data.cash = {USD: 1};
        return data;
      });
    Axios.get('/users/leaderboard')
    .then(results => {
      const keys = Object.keys(results.data);
      const newBoard = keys.map((key, idx) => {
        const holdings = results.data[key];
        const totalPortfolioValue = Object.keys(holdings).reduce((accumulator, key) => {
            return accumulator + (prices[key].USD * holdings[key])
        }, 0)
        const item = {name: key, id: idx, totalPortfolioValue: totalPortfolioValue}
        return item;
      })
      sortByAmount(newBoard)
      this.setState({board: newBoard})
    })
  }
  render() {
    const {classes} = this.props;
    return (
      <Grid container className={classes.holdingtable} alignItems="center" justify="center">
        <Grid item xs={8}>
        <Typography variant="h2" gutterBottom>
            Leaderboard
        </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Portfolio Value (Crypto and Cash)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {this.state.board.map(row => (

              <TradeHistoryModal 
              id={row.id}
              name={row.name}
              totalPortfolioValue={row.totalPortfolioValue}
              />
              
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
