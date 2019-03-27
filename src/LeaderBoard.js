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

import Axios from 'axios';

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
    this.state = { board: [ ] }
  }
  async componentDidMount(){
    const prices = await Axios.get('/api/prices').then( results => results.data );

    Axios.get('/action/leaderBoard')
    .then(results => {
      const keys = Object.keys(results.data);
      const newBoard = keys.map(key => {
        console.log(key);
        const item = results.data[key];
        return item;
      })
      console.log(newBoard)
      sortByAmount(newBoard)
      console.log(newBoard)
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
              <TableCell>Name</TableCell>
              <TableCell>Portfolio Value (Crypto and Cash)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {this.state.board.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.totalPortfolioValue}</TableCell>
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
