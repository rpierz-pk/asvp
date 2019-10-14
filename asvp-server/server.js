const express = require('express');
const morgan = require('morgan');
const controller = require('./controller.js');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/', controller);

app.listen(8000);
console.log('Listening on 8000...');

process.on('SIGINT', function() {
  process.exit();
});
