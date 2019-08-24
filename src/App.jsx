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
      buyingDate: null,
      cryptoAmount: "",
      cryptoType: "",
      location: "home",
      sellingDate: null,
      sellingData: {},
      tsyms: "USD" // to symbol -- can be multiple value 'BTC,USD,CAD,EUR'
    };
  }

  getData = (cryptoType, tsyms, ts) => {
    const url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${cryptoType}&tsyms=${tsyms}&ts=${ts}`;

    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => console.log(err));
    });
  };

  handleBuyingData = async date => {
    const { cryptoType, tsyms } = this.state;
    const ts = date.unix();
    const buyingData = await this.getData(cryptoType, tsyms, ts);
    this.setState({ buyingDate: date, buyingData });
  };

  handleSellingData = async date => {
    const { cryptoType, tsyms } = this.state;
    const ts = date.unix();
    const sellingData = await this.getData(cryptoType, tsyms, ts);
    this.setState({ sellingDate: date, sellingData });
  };

  routingSystem = () => {
    switch (this.state.location) {
      case "results":
        return <Results {...this.state} />;
      default:
        return (
          <Home
            handleBuyingData={this.handleBuyingData}
            handleSellingData={this.handleSellingData}
            globalState={this.state}
            setCryptoAmount={this.setCryptoAmount}
            setCryptoType={this.setCryptoType}
            setLocation={this.setLocation}
          />
        );
    }
  };

  setCryptoAmount = event => {
    this.setState({ cryptoAmount: event.target.value });
  };

  setCryptoType = event => {
    this.setState({ cryptoType: event.target.value });
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
