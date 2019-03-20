import React, { Component } from 'react';
import './App.css';
import TopNav from './TopNav'
import CoinHoldings from './CoinHoldings';
import CoinOptions from './CoinOptions';
class App extends Component {
  render() {
    return (
      <div className="App">
       <TopNav />
        <CoinHoldings/>
      <CoinOptions />

      </div>
    );
  }
}

export default App;
