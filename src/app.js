
const express = require('express')
const routes = require('./routes')
var bodyParser = require('body-parser')
var cors = require('cors');


const app = express()
const port = 9090




const allowedOrigins = ["http://localhost:3000"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  }

  next();
});
app.use(bodyParser.json());
app.use('/',routes());

app.use(bodyParser.urlencoded({ extended: true }))






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})