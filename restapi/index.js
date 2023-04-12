const express = require('express');
const app = express();
const mongoose=require('mongoose')

require('dotenv').config(); 


const {db} = require('./config/db')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')


//database connection
mongoose.connect('mongodb://127.0.0.1:27017/crud',{useNewUrlParser: true})
    .then((x) => {
        console.log('Database connected sucessfully ')
    })
    .catch((err) => {
        //throw new Error(err);
        //res.status(500).json({message:err.reason});
        console.log('Could not connected to database : ' + error)
        console.log('Error connecting to Database', err.reason)
    })


const cors=require('cors');
var corsOptions={
    origin: 'http://localhost:3000/'
}
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//routes
app.get("/",(req, res)=>{
    res.json({message:"Rest Api"})
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.get('*', async(req, res,)=>{
        res.status(404).json({message:"Not Found"});
});

//error handling
app.use((err, req, res, next)=>{
   res.status(500).json({message: err.message, status: err.status});
   next();
})

const port  = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});