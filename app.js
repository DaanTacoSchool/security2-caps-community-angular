const express = require('express');
const http = require('http');
const path = require('path');
const app = express();

app.get('/', (req, res) => res.send('Caps community API'));

const port = process.env.port || '4201';
app.set('port', port);
app.listen(port, () => console.log('Running on port: ' + port));

