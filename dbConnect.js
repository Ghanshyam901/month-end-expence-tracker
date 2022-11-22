
// const { connect } = require('http2');
const mongoose = require('mongoose')
 mongoose.connect('mongodb+srv://ghanshyam901:Rocksk901@cluster0.m3pdhky.mongodb.net/monthend-db',{useNewUrlParser : true,useUnifiedTopology : true})

const connection = mongoose.connection;
connection.on('error',err => console.log(err));

connection.on('connected' ,() => console.log('mongo db connection successfull'))   