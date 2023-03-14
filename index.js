// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const PORT = 18888;

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
  console.log(req.params.date);
  const date = req.params.date;

  if(date.includes('-')){
    res.json({ unix: new Date(date).getTime(), utc: new Date(date).toUTCString() });
  } else if(Number.isInteger(date)){
    res.json({ unix: new Date(parseInt(date)).getTime(), utc: new Date(parseInt(date)).toUTCString() });
  } else if (date === "") {
    res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
  } else {
    res.json({ error: 'Invalid Date' });
  }
});

// listen for requests :)
const listener = app.listen(PORT, function () {
  console.log(
    'Use this link to preview example site: http://localhost:' + PORT
  );
});
