const express = require('express');
var app = express();

require('./startup/db.js').connect();
require('./startup/prod.js')(app);
require('./startup/scriptRunner.js').main();

const http = require('http').Server(app);

var port = process.env.PORT;
const server = http.listen(port, () => console.log('info', `Listening on port ${port}...`));

exports.server = server;