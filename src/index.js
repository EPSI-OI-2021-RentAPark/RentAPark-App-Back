const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./event');

const connection = mysql.createConnection({
    host     : 'mysql-freelancerdata.alwaysdata.net',
    user     : '179860',
    password : '20guetta1995',
    database : 'freelancerdata_parkinrent'
  });
  

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});