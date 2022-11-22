import { Progress } from "antd";
import React from "react";
import "../resources/Analatics.css";

function Analatics({ transactions }) {
  const TotalTransactions = transactions.length;
  const TotalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "Income"
  );
  const TotalExpenceTransactions = transactions.filter(
    (transaction) => transaction.type === "Expence"
  );
  const TotalIncomeTransactionsPercentage =
    (TotalIncomeTransactions.length / TotalTransactions) * 100;
  const TotalExpenceTransactionsPercentage =
    (TotalExpenceTransactions.length / TotalTransactions) * 100;

  //    turnover
  const totalTurnOver = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const TotalIncomeTurnOver = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const TotalExpenceTurnOver = transactions
    .filter((transaction) => transaction.type === "Expence")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const TotalincomeTurnOverPercentage =
    (TotalIncomeTurnOver / totalTurnOver) * 100;
  const TotaExpenceTurnOverPercentage =
    (TotalExpenceTurnOver / totalTurnOver) * 100;

  const categoies = [
    "salary",
    "freelance",
    "investment",
    "entertainement",
    "food",
    "travel",
    "education",
    "medical",
    "tax",
  ];

  return (
    <div className="analytics">
      <div className="row">
        <div className="col-md-4">
          <div className="transactions-count">
            <h4>Total transaction :{TotalTransactions}</h4>
            <hr />
            <h5>Income :{TotalIncomeTransactions.length}</h5>
            <h5>Expence :{TotalExpenceTransactions.length}</h5>
            <div className="progress-bars">
              <Progress
                className="mx-5"
                type="circle"
                strokeColor="green"
                percent={TotalIncomeTransactionsPercentage.toFixed(1)}
              />
              <Progress
                type="circle"
                strokeColor="red"
                percent={TotalExpenceTransactionsPercentage.toFixed(1)}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="transactions-count">
            <h4>Total Turnover :{totalTurnOver}</h4>
            <hr />
            <h5>Income :{TotalIncomeTurnOver}</h5>
            <h5>Expence :{TotalExpenceTurnOver}</h5>
            <div className="progress-bars">
              <Progress
                className="mx-5"
                type="circle"
                strokeColor="green"
                percent={TotalincomeTurnOverPercentage.toFixed(1)}
              />
              <Progress
                type="circle"
                strokeColor="red"
                percent={TotaExpenceTurnOverPercentage.toFixed(1)}
              />
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="row">
        <div className="col-md-6">
          <div className="category-analysis">
            <h3>Income - Category wise</h3>
            {categoies.map((category) => {
              const amount = transactions.filter(
                (t) => t.type == "Income" && t.category === category).reduce(
                  (acc, t) => acc + t.amount,
                  0);
              return (
                amount > 0 &&   <div className="category-card">
                  <h5>{category}</h5>
                  <Progress percent={((amount / TotalIncomeTurnOver) * 100).toFixed(1)} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-6">
          <div className="category-analysis">
            <h3>Expence - Category wise</h3>
            {categoies.map((category) => {
              const amount = transactions.filter(
                (t) => t.type == "Expence" && t.category === category).reduce(
                  (acc, t) => acc + t.amount,
                  0);
              return (
               amount > 0 && <div className="category-card">
                  <h5>{category}</h5>
                  <Progress percent={((amount / TotalExpenceTurnOver) * 100).toFixed(1)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analatics;
