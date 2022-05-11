require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());



const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
});