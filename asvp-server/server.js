const express = require('express');
const morgan = require('morgan');
const controller = require('./controller.js');
const favicon = require('serve-favicon');

const app = express();

app.use(morgan(':date[web]'));
app.use(morgan('dev'));
app.use(express.json());
app.use(favicon(__dirname+'/favicon.ico'));

// CORS Handling
app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

app.use('/', controller);

app.listen(8000);
console.log('Listening on 8000...');

process.on('SIGINT', function() {
  process.exit();
});
