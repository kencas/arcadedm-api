const express = require('express');
const app =  express();
var bodyParser = require('body-parser');
// Config body-parser
app.use(bodyParser.json());
const mongoose = require('mongoose');
const config = require('./config');


mongoose.connect(config.database,function(err)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Connected to the Database");
    }
});

mongoose.Promise = global.Promise;


// // const accountRoutes = require('./api/routes/accounts');
// // const acctypeRoutes = require('./api/routes/acctypes');
// // const ledgerRoutes = require('./api/routes/ledgers');
const productsRoutes = require('./pilot/routes/products');
const merchantRoutes = require('./pilot/routes/merchants');
const categoriesRoutes = require('./pilot/routes/categories');

// // app.use((req,res,next) => {
// //     res.status(200).json({
// //         message: "it works well for me"
// //     });
// // });



// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// app.use('/uploads',express.static('uploads'));

// app.use((req, res, next) =>{
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');

//     if(req.method === 'OPTIONS')
//     {
//         res.header('Access-Control-Allow-Methods','PUT,POST,GET,PATCH,DELETE');
//         return res.status(200).json({});
//     }

//     next();
    
// });

// app.use('/accounts',accountRoutes);
// app.use('/customers',customerRoutes);
// app.use('/acctypes',acctypeRoutes);
// app.use('/ledgers',ledgerRoutes);
 app.use('/categories',categoriesRoutes);
 app.use('/merchants',merchantRoutes);
 app.use('/products',productsRoutes);


// app.use((req, res, next) =>{
//     const error = new Error('Invalid request');
//     error.status = 404;
//     next(error);
// });

// app.use((error, req, res, next) =>{
//     res.status(error.status);
//     res.json({
//         error :{
//             message : error.message
//         }
//     });
// });

module.exports = app;