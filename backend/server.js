require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserModel = require('./models/user');
const apis = require('./routes/routeApi');

app.use(express.static('public'));
app.use(express.urlencoded({limit:'50mb',extended: true})); //image ke liye limit
app.use(express.json({limit:'50mb',extended:true})); //image ke liye limit kyuki too large error aa rha tha
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //json main bhi pass kar rahe hai
app.use(cors())// positioning cors ki depend karti hai kha likh rahe ho

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false    
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.URI + process.env.DB,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("Database successfully connected!!"))
.catch(err=>{
    console.log(err)
    console.log("DB Not Connected")
});

passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser()); //serialize is to store a kind of data in cookie in this UserModel 
passport.deserializeUser(UserModel.deserializeUser()); //deserialize is to retrive that kind of data from the cookie

app.use('/api', apis);
app.listen(process.env.PORT, () => console.log("Server is working fine."));