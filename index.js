require('dotenv').config();
const express = require('express');
const app =  express();
const db = require('./config/db')
db();

const port = process.env.PORT||4000;

app.use(express.json());

app.use("/api", require("./routes/index.js"));

app.use((req,res,next)=>{
    const error = new Error("This is not valid endpoint");
    error.status = 404;
    next(error);
})

app.use((err,req,res,next)=>{
    res.status(err.status).json({error:err.message || "Something went wrong "})
})

const server = app.listen(port, (err) => {
    if (err) {
      console.log(`Error in server listening :-${err}`);
      return;
    }
    console.log(`Server listening at http://localhost:${port}`);
  });