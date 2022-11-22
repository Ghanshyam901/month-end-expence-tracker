const { Router } = require("express");
const moment = require("moment");
const express = require("express");
const Transaction = require("../models/Transaction.js");

const router = express.Router();

router.post("/add-transaction", async function (req, res) {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.send("newTransaction added Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/edit-transaction", async function (req, res) {
  try {
    // const newTransaction = new Transaction(req.body);
    await Transaction.findByIdAndUpdate({_id:req.body.transactionId},req.body.payload)
    // await newTransaction.save();
    res.send("Transaction updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});


router.post("/delete-transaction", async function (req, res) {
  try {
    // const newTransaction = new Transaction(req.body);
    await Transaction.findOneAndDelete({_id:req.body.transactionId})
    // await newTransaction.save();
    res.send("Transaction updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/get-all-transaction", async (req, res) => {
  const { frequency, selectedRange ,type } = req.body;

  try {
    const transactions = await Transaction.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),

      userid: req.body.userid,
      ...(type!=='all' && {type}) 
    });
    res.send(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
