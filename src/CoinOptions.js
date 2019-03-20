import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CoinCard from './CoinCardClass';
import Axios from 'axios';
import Paper from '@material-ui/core/Paper';

const images = {
  "BTC": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bitcoin_logo.svg/320px-Bitcoin_logo.svg.png",
  "ETH": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/200px-Ethereum_logo_2014.svg.png",
  "XRP": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ripple_logo.svg/200px-Ripple_logo.svg.png",
  "LTC": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/6_Full_Logo_S-2.png/320px-6_Full_Logo_S-2.png",
  "EOS": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Canon_EOS_1000D_IMG_2001b.jpg/252px-Canon_EOS_1000D_IMG_2001b.jpg",
  "BCH": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bitcoin_Cash.png/287px-Bitcoin_Cash.png",
  "USDT": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Tether_Logo.svg/320px-Tether_Logo.svg.png"
}
class CoinOptions extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [{ name: "Fake", text: "FakeText", price: 1000 }],
      style: { maxWidth: 960, margin: 'auto'}
    };
  }
  componentDidMount(){
    console.log("Mounted")
    Axios.get('http://localhost:3000/prices')
    .then(results => {
      //We want it to be an array so we can map over it.
      const itemsNew = Object.keys(results.data).map( key => {
        return {
          name: key,
          text: "???",
          price: results.data[key]["USD"]
        }
      })
      this.setState({items: itemsNew})
    })
  }
  render() {
    return (
      <Grid container style={this.state.style}  alignItems="center" spacing={16} justify="center">
      
      { this.state.items.map( (item, idx)  => {
        const image = images[item.name];
        return ( 
          <Grid key={idx} item xs={3}>
          <CoinCard image={image} name={item.name} text={item.text} price={item.price}/>
          </Grid>
        )
      })}
      </Grid>
    );
  }
}

export default CoinOptions;
