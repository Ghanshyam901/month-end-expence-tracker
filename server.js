const express = require("express");
const dbConnect = require("./dbConnect");

const app = express();
const path = require('path');

app.use(express.json());
const userRoute = require("./routes/usersRoute");
const TransactionsRoute = require("./routes/TransactionsRoutes");
app.use("/api/users/", userRoute);
app.use("/api/transactions", TransactionsRoute);

const port =process.env.PORT || 6000;

if(process.env.NODE_ENV == 'production'){
    app.use('/',express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'clinet/build/index.html'))
    })
}

app.get("/", (req, res) => res.send("hello server"));
app.listen(port, () => console.log(" server running  at " + port));
