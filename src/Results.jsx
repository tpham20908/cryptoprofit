import React, { Component } from "react";

const styles = {
  active: {
    background: "#304ffe"
  },
  ads: {
    backgroundColor: "#888",
    height: 98,
    margin: "2rem auto",
    maxWidth: 728
  },
  highlightedText: {
    color: "#07d5fe",
    fontSize: "4rem",
    fontWeight: 100,
    margin: "2rem 0"
  },
  mainBtn: {
    color: "#fff",
    textDecoration: "none",
    display: "inline-block",
    padding: "10px 20px",
    borderRadius: 3,
    border: "1px solid #304ffe",
    margin: "3rem 0.2rem",
    transition: "all 0.2s ease-in-out",

    "&:hover": {
      background: "#304ffe"
    }
  },
  profitPercentage: {
    fontWeight: 300
  },
  results: {
    textAlign: "center"
  },
  statement: {
    fontSize: "2rem",
    fontWeight: 200
  }
};

class Results extends Component {
  formatDate = (day, month, year) => {
    let monthText;
    switch (month) {
      case 1:
        monthText = "Jan";
        break;
      case 2:
        monthText = "Feb";
        break;
      case 3:
        monthText = "Mar";
        break;
      case 4:
        monthText = "Apr";
        break;
      case 5:
        monthText = "May";
        break;
      case 6:
        monthText = "Jun";
        break;
      case 7:
        monthText = "Jul";
        break;
      case 8:
        monthText = "Aug";
        break;
      case 9:
        monthText = "Sep";
        break;
      case 10:
        monthText = "Oct";
        break;
      case 11:
        monthText = "Nov";
        break;
      default:
        monthText = "Dec";
        break;
    }

    return `${monthText} ${day} ${year}`;
  };

  profitStatement = (buyingAmount, sellingAmount) => {
    const profitPercentage = ((sellingAmount / buyingAmount) * 100).toFixed(2);
    const result = Math.abs(profitPercentage - 100).toFixed(2);
    const statement =
      profitPercentage >= 100
        ? `You would make ${result}% profit.`
        : `You would lose ${result}% your investment.`;

    return statement;
  };

  render() {
    const {
      buyingDate,
      buyingData,
      cryptoAmount,
      fsym,
      sellingDate,
      sellingData,
      tsym
    } = this.props;

    const buyingDateConverted = new Date(buyingDate.unix() * 1000);
    const sellingDateConverted = new Date(sellingDate.unix() * 1000);
    const buyingDay = buyingDateConverted.getDate();
    const buyingMonth = buyingDateConverted.getMonth() + 1;
    const buyingYear = buyingDateConverted.getFullYear();
    const sellingDay = sellingDateConverted.getDate();
    const sellingMonth = sellingDateConverted.getMonth() + 1;
    const sellingYear = sellingDateConverted.getFullYear();

    const formatedBuyingDate = this.formatDate(
      buyingDay,
      buyingMonth,
      buyingYear
    );

    const formatedSellingDate = this.formatDate(
      sellingDay,
      sellingMonth,
      sellingYear
    );

    const buyingAmount = (cryptoAmount * buyingData[fsym][tsym]).toFixed(2);
    const sellingAmount = (cryptoAmount * sellingData[fsym][tsym]).toFixed(2);

    return (
      <section style={styles.results}>
        <div className="container">
          <div className="col-md-12">
            <div style={styles.ads}>Google ads</div>
          </div>
          <div className="col-md-12">
            <h2 style={styles.statement}>
              Your ${buyingAmount} {tsym} investment on {formatedBuyingDate}{" "}
              would be
            </h2>
            <h1 style={styles.highlightedText}>${sellingAmount}</h1>
            <h2 style={styles.statement}>
              on {formatedSellingDate}.{" "}
              <span style={styles.profitPercentage}>
                {this.profitStatement(buyingAmount, sellingAmount)}
              </span>
            </h2>
            <a href="/" style={{ ...styles.mainBtn, ...styles.active }}>
              Create account to keep track of all your records
            </a>
            <a href="/" style={styles.mainBtn}>
              Another transaction
            </a>
          </div>
          <div className="col-md-12">
            <div style={styles.ads}>Google ads</div>
          </div>
        </div>
      </section>
    );
  }
}

export default Results;
