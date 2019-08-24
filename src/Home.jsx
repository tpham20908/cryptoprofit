import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "./index.css";

const styles = {
  home: {},
  button: {
    backgroundColor: "#304ffe",
    border: "none",
    boxShadow: "1px 1px 5px #ededee",
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: 200,
    letterSpacing: 3,
    marginTop: "3rem",
    padding: "0.8rem 0",
    textShadow: "0 2px 2px #333",
    width: "100%"
  },
  bitcoinLogo: {
    marginTop: "2.5rem",
    paddingRight: "4rem",
    width: "100%"
  },
  enterTransaction: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    marginTop: "2.5rem",
    textAlign: "center"
  },
  label: {
    color: "#94bcb9",
    display: "block",
    fontSize: "1.2rem",
    fontWeight: 600,
    letterSpacing: 2,
    marginBottom: "1rem",
    marginTop: "1.5rem",
    textTransform: "uppercase"
  }
};

class Home extends Component {
  render() {
    const {
      globalState,
      handleBuyingDate,
      handleSellingDate,
      setCryptoAmount,
      setLocation
    } = this.props;

    return (
      <section style={styles.home}>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <img
                style={styles.bitcoinLogo}
                src="img/bitcoinLogo.png"
                alt="Bitcoin"
              />
            </div>

            <div className="col-md-7">
              <h2 style={styles.enterTransaction}>Enter Transaction</h2>

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="amount" style={styles.label}>
                    Amount
                  </label>
                  <input
                    style={styles.input}
                    type="number"
                    name="amount"
                    value={globalState.cryptoAmount}
                    onChange={setCryptoAmount}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="type" style={styles.label}>
                    Type
                  </label>
                  <select>
                    <option value="BNB">Binance Coin</option>
                    <option value="BTC">Bitcoin</option>
                    <option value="BCH">Bitcoin Cash</option>
                    <option value="BTG">Bitcoin Gold</option>
                    <option value="DASH">Dash</option>
                    <option value="EOS">EOS</option>
                    <option value="ETH">Ethereum</option>
                    <option value="ETC">Ethereum Classic</option>
                    <option value="LTC">LiteCoin</option>
                    <option value="MONA">MonaCoin</option>
                    <option value="XMR">Monero</option>
                    <option value="XLM">Stellar</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label style={styles.label}>Buying Date</label>
                  <DatePicker
                    selected={globalState.buyingDate}
                    onChange={handleBuyingDate}
                    showMonthDropdown
                    showYearDropdown
                    maxDate={moment()}
                    useShortMonthInDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={20}
                  />
                </div>
                <div className="col-md-6">
                  <label style={styles.label}>Selling Date</label>
                  <DatePicker
                    selected={globalState.sellingDate}
                    onChange={handleSellingDate}
                    showMonthDropdown
                    showYearDropdown
                    maxDate={moment()}
                    useShortMonthInDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={5}
                  />
                </div>
              </div>

              <button
                style={styles.button}
                onClick={() => setLocation("results")}
              >
                Check Profit
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
