const express = require('express');
const apiMocker = require('connect-api-mocker');

const app = express();

app.use('/api', apiMocker('./server/mock-api'));

app.listen(9000);
