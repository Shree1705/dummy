const express = require('express')
const cors = require("cors")
const cookieParser = require('cookie-parser')

const port = 5000
const app = express()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get("/",(req,res)=>{
    res.send(`running on ${port}`)
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.get("/getData",(req,res)=>{
  console.log("requested getdata api");
  res.send("getData Api")
})