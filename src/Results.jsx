import React, { Component } from "react";

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

    // const buyingDateConverted = new Date(buyingDate.unix() * 1000);
    // const buyingDateConverted = new Date(buyingDate).getTime() * 1000;
    // const sellingDateConverted = new Date(sellingDate.unix() * 1000);
    // const sellingDateConverted = new Date(sellingDate).getTime() * 1000;
    const buyingDateConverted = new Date(buyingDate);
    const sellingDateConverted = new Date(sellingDate);
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
      <section id="results">
        <div className="container">
          <div className="col-md-12">
            <div className="ads" />
          </div>
          <div className="col-md-12">
            <h2>
              Your ${buyingAmount} {tsym} investment on {formatedBuyingDate}{" "}
              would be
            </h2>
            <h1>${sellingAmount}</h1>
            <h2>
              on {formatedSellingDate}.{" "}
              <span className="profit-percentage">
                {this.profitStatement(buyingAmount, sellingAmount)}
              </span>
            </h2>
            <a href="/" className="main-btn active">
              Create account to keep track of all your records
            </a>
            <a href="/" className="main-btn">
              Another transaction
            </a>
          </div>
          <div className="col-md-12">
            <div className="ads" />
          </div>
        </div>
      </section>
    );
  }
}

export default Results;
