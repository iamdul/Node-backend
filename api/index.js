const express= require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

require('dotenv').config();
const port=process.env.SERVER_PORT || 3000;

//=========================
const customerRoute = require('./route/CustomerRoute');
const userRoute = require('./route/UserRoute');

//=========================

const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/customer_crud')
.then(()=>{
    app.listen(port,()=>{
        console.log(`api start & running on port ${port} `)
    });
});

//===================================
app.use('/api/v1/customer',customerRoute);
app.use('/api/v1/user',userRoute);

// app.use('/',(req,res,next)=>{
//     res.send('<h1>Server Works!<h2>');
// })