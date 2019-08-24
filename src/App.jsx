import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import Home from "./Home";
import Results from "./Results";

const styles = {
  header: {
    padding: "1.2rem 0",
    overflow: "auto"
  },

  logo: {
    float: "left"
  },

  menu: {
    float: "right"
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    display: "inline-block",
    padding: "10px 20px",
    borderRadius: 3,
    border: "1px solid #304ffe",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      background: "#304ffe"
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      buyingData: {},
      buyingDate: moment(),
      cryptoAmount: "",
      fsym: "ETH", // from symbol: bitcoin, litecoin, ethereum, monero, nem, ripple, namecoin, peercoin, dash
      location: "home",
      sellingDate: moment(),
      sellingData: {},
      tsym: "USD" // to symbol -- can be multiple value 'BTC,USD,CAD,EUR'
    };
  }

  async componentDidMount() {
    const { fsym, tsym, sellingDate } = this.state;
    const data = await this.getData(fsym, tsym, sellingDate.unix());
    this.setState({ buyingData: data, sellingData: data });
  }

  getData = (fsym, tsym, ts) => {
    const url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${fsym}&tsyms=${tsym}&ts=${ts}`;

    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => console.log(err));
    });
  };

  handleBuyingDate = async date => {
    const { fsym, tsym } = this.state;
    const ts = date.unix();
    const buyingData = await this.getData(fsym, tsym, ts);
    this.setState({ buyingDate: date, buyingData });
  };

  handleSellingDate = async date => {
    const { fsym, tsym } = this.state;
    const ts = date.unix();
    const sellingData = await this.getData(fsym, tsym, ts);
    this.setState({ sellingDate: date, sellingData });
  };

  routingSystem = () => {
    switch (this.state.location) {
      case "results":
        return <Results {...this.state} />;
      default:
        return (
          <Home
            handleBuyingDate={this.handleBuyingDate}
            handleSellingDate={this.handleSellingDate}
            globalState={this.state}
            setCryptoAmount={this.setCryptoAmount}
            setLocation={this.setLocation}
          />
        );
    }
  };

  setCryptoAmount = event => {
    this.setState({ cryptoAmount: event.target.value });
  };

  setLocation = location => {
    this.setState({ location });
  };

  render() {
    return (
      <div className="home">
        <div className="container">
          <header style={styles.header}>
            <div style={styles.logo}>Crypto Profit</div>
            <nav style={styles.menu}>
              <a href="/" style={styles.link}>
                Register
              </a>
            </nav>
          </header>
          {this.routingSystem()}
        </div>
      </div>
    );
  }
}

export default App;
