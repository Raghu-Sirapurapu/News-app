require('dotenv').config()

const express = require('express')
const cors = require('cors');
const app = express();
const connectToDB = require('./database/db');
const newsLetterRoutes =  require('./routes/NewsLetterRoutes')
const authRoutes = require('./routes/AuthRoutes');
const adminRoutes = require('./routes/AdminRoutes')
//connect to database
connectToDB();

app.use(cors({
  origin: process.env.FRONTEND_URL, //  frontend URL
  credentials: true // allow cookies/headers
}));

//middleware to parse json
app.use(express.json());

// ➜ Enables req.body to hold form data
app.use(express.urlencoded({ extended: true })); 


app.use('/api/newsletters',newsLetterRoutes);
app.use('/api/auth/',authRoutes)
app.use('/api/admin',adminRoutes)


const port = process.env.PORT || 5000;

app.listen(port,(req,res)=>{
    console.log('server is now listening to port 5000');
})

