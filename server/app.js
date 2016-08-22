
'use strict';

const http = require('http');
const express = require('express');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');


const app = express();
app.set('host', 'localhost');
app.set('port', 8000);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

// Routing
app.use('/api', require('routes')(express.Router()));

app.use((req, res, next) => {

  res.json({
    status: 404,
    message: 'Not found'
  });
});


app.use(errorHandler());

const server = http.createServer(app);
require('socket')(server);

const port = app.get('port');
server.listen(port, app.get('host'), () => {
  console.log('Express server listening on port ' + port);
});
