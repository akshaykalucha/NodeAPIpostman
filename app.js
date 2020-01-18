const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/order')
const{Pool,Client} = require('pg')
const mongoose = require('mongoose')
const db = require('./keys').MongoURI;
const MongoClient = require('mongodb').MongoClient;


MongoClient.connect(db, { useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));



app.use((req,res,next)=>{
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
})

//this is urls.py of nodejs
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


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

//Misc code

// const connectionString = 'postgresql://postgres:akshay123@localhost:5432/testbb'

// // const client = new Client({
// //     connectionString:connectionString
// // })
// // client.connect()

// // client.query('SELECT * FROM account_student',(err,res)=>{
// //     console.log(err,res)
// //     client.end()
// // })

// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "shop",
//     password: "akshay123",
//     port: 5432
//   })


// //   pool.query("CREATE TABLE products (id INT, name VARCHAR)",(err,res)=>{
// //     console.log(err,res)
// //     pool.end()
// // })
//   pool.query("INSERT INTO products(id,name)values(1,'Microsoft')", (err, res) => {
//     console.log(err, res)
//     pool.end()
//   })