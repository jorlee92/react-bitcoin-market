import React, { Component } from 'react';
import './App.css';
import TopNav from './TopNav'
import CoinHoldings from './CoinHoldings';
import CoinOptions from './CoinOptions';
import LeaderBoard from './LeaderBoard';
import LoginForm from './LoginForm'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      userID: null,
    }
  }
  changeID(id){
    this.setState({userID: id})
    console.log("Updated user ID")
  }
  componentDidMount(){
    //Attempt to get the current userID, if it is null we arent logged in.
    Axios.get('http://localhost:3000/profile/').then(result => {
      result.data.userID ? this.changeID(result.data.userID) : console.log("User does not appear to be logged in");
    }).catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
      <Router>
      <TopNav userID={this.state.userID}/>
      <Route path="/" exact component={CoinOptions} />
        <Route path="/buycoins/" component={CoinOptions} />
        <Route path="/leaderboard/" component={LeaderBoard} />
        <Route path="/login" component={LoginForm} />
        <Route path="/profile" component={CoinHoldings} />
    </Router>
      </div>
    );
  }
}

export default App;
