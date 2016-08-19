
'use strict';

const http = require('http');
const express = require('express');
const errorHandler = require('errorhandler');


const app = express();
app.set('host', 'localhost');
app.set('port', 8000);

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

// Routing

app.use('/', require('routes')(express.Router()));

app.use((req, res, next) => {
  next(new errors.HttpError(404, 'Запрашиваемый ресурс не найден'));
});


app.use(errorHandler());

const server = http.createServer(app);
//require('socket')(server);

const port = app.get('port');
server.listen(port, app.get('host'), () => {
  console.log('Express server listening on port ' + port);
});
