const mongoose = require('mongoose')

const transactionsSchema = new mongoose.Schema({
    userid : {type :String ,require: true},
   amount :{type :Number ,require: true},
   type : {type :String ,require:true},
   category :{type :String , require:true},
   reference :{type :String ,required :true},
   date:{type :Date , require:true},
   description :{type :String , require:true}
})

const TransactionModel = mongoose.model('Transactions',transactionsSchema)

module.exports = TransactionModel
