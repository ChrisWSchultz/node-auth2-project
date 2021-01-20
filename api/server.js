const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require("cookie-parser");

const users = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', users);

module.exports = app;