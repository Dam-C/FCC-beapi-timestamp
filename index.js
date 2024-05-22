// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { param } = require('express/lib/request');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

app.get('/api/:date?', (req, res) => {
  // set the default date to return (now)
  let result = {
    unix: Date.now(),
    utc: new Date().toUTCString()
  }
  // get the users parameters from request
  let paramsDate = req.params.date;
  // try to generate a date object
  let unixParmasDate = new Date(paramsDate)

  // only runs code if params is not empty/undefined
  if (paramsDate != undefined) {
    // check if parmas is a number and generate date
    if (!isNaN(paramsDate)) {
      result.unix = Number(paramsDate);
      result.utc = new Date(Number(paramsDate)).toUTCString();
      // check if params generate a correct date object
    } else if (unixParmasDate != 'Invalid Date') {
      result.unix = Date.parse(unixParmasDate);
      result.utc = new Date(paramsDate).toUTCString();
    } else {
      result = {error: 'Invalid Date'}
    } 
  }
  // serve the result to user
  res.json(result)
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});