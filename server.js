require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./route/auth.js');

const app = express();
app.use(express.json());
app.use(cors());


mongoose
.connect(process.env.DB_URL)
.then(()=>console.log(`Database connection successfull`))
.catch((err)=>console.log(`Database connection failed`, err))

app.use('/auth',authRoutes);


const port = process.env.PORT||8080
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})