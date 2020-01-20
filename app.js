const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/order')
<<<<<<< Updated upstream
const{Pool,Client} = require('pg')
const connectionString = 'postgresql://postgres:akshay123@localhost:5432/restupdated2'

const client = new Client({
    connectionString:connectionString
})
client.connect()
=======
const db = require('./keys').MongoURI;

//mongodb connection
const mongoose = require('mongoose')
mongoose.connect(db, { useUnifiedTopology: true })
var dbs = mongoose.connection;


dbs.on("error", console.error.bind(console, "connection error"));
dbs.once("open", function(callback) {
    console.log("Connection succeeded.");
});



//this is urls.py of nodejs
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
>>>>>>> Stashed changes

client.query('SELECT * FROM account_student',(err,res)=>{
    console.log(err,res)
    client.end()
})

app.use((req,res,next)=>{
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
})



app.use('/products', productRoutes)
app.use('/orders', orderRoutes)


app.use((req,res,next) => {
    const error = new Error("Not Found")
    error.status = 404;
    next(error)
})

app.use((error, req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            Typr: "Error",
            Message: "Not Found",
            data: null
        }
    })
})

console.log('Server running at http://localhost:3000');
module.exports = app;