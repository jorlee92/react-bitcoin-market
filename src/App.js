import React, { Component } from 'react';
import './App.css';
import TopNav from './TopNav'
import CoinHoldings from './CoinHoldings';
import CoinOptions from './CoinOptions';
import LeaderBoard from './LeaderBoard';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      userID: null,
      dollars: 0,
    }
  }
  async changeData(id, d){
    await this.setState({userID: id})
    console.log("Updated user ID")
    await this.setState({dollars: d })
    console.log("Updated user balance")
  }
  componentDidMount(){
    //Attempt to get the current userID, if it is null we arent logged in.
    Axios.get('/users/login').then(result => {
      result.data.userID ? this.changeData(result.data.userID, result.data.dollars) : console.log("User does not appear to be logged in");
    }).catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
      <Router>
      <TopNav userID={this.state.userID} dollars={this.state.dollars}/>
      <Route path="/" exact component={CoinOptions} />
        <Route path="/buycoins/" component={CoinOptions} />
        <Route path="/leaderboard/" component={LeaderBoard} />
        <Route path="/login" component={LoginForm} />
        <Route path="/profile" component={CoinHoldings} />
        <Route path="/register" component={RegisterForm} />
    </Router>
      </div>
    );
  }
}

export default App;
