import React, { Component } from 'react';
import './App.css';
import TopNav from './TopNav'
import CoinHoldings from './CoinHoldings';
import CoinOptions from './CoinOptions';
import LeaderBoard from './LeaderBoard';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
      <TopNav />

      <Route path="/" exact component={CoinHoldings} />
        <Route path="/buycoins/" component={CoinOptions} />
        <Route path="/leaderboard/" component={LeaderBoard} />
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/buycoins/">Buy More Coins</Link>
            </li>
            <li>
              <Link to="/leaderboard/">Leader Board</Link>
            </li>
          </ul>
        </nav>


      </div>
    </Router>
      </div>
    );
  }
}

export default App;
