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

const fakeData = [
  {id:1,name:"Bitcoin",quantity:5,value:5000},
  {id:2,name:"Bitcoin",quantity:5,value:5000},
  {id:3,name:"Bitcoin",quantity:5,value:5000},
  {id:4,name:"Bitcoin",quantity:5,value:5000},

]
const styles = {
  holdingtable : {
    paddingBottom: 50
  }
}

class CoinHoldings extends Component {
  constructor(props){
    super(props);
    this.state = { board: [ ] }
  }
  async componentDidMount(){
    const prices = await Axios.get('http://localhost:3000/prices').then( results => results.data );

    Axios.get('http://localhost:3000/action/leaderBoard')
    .then(results => {
      const keys = Object.keys(results.data);
      const newBoard = keys.map(key => {
        console.log(key);
        const item = results.data[key];
        return item;
      })
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
              <TableCell>Holdings ($USD)</TableCell>
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
