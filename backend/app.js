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