const express = require('express');
const app = express();

app.use('/assets', express.static(__dirname +'/../assets'));
app.use('/assets', express.static(__dirname +'/'));
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index_test.html');
});

app.listen(8888, function () {
	console.log('Running on http://localhost:8888/');
});
