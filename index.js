// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const PORT = 18888;
let invalid = false;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
  let date = new Date(req.params.date);
  let result = {};

  if(req.params.date === undefined){
    date = new Date();
  } else if(date.toString() === "Invalid Date"){
    date = new Date(Number.parseInt(req.params.date));
    if(date.toString() === "Invalid Date"){
      result = {error: "Invalid Date"};
      invalid = true;
    }
  }
  
  if(!invalid){
    result = {
      unix: date.getTime(),
      utc: date.toUTCString()
    }
  } else {
    invalid = false;
  }
  
  res.json(result);
    
});

// listen for requests :)
const listener = app.listen(PORT, function () {
  console.log(
    'Use this link to preview example site: http://localhost:' + PORT
  );
});
