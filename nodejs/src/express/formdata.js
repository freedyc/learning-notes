const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const app = express();

const {inspect} = require('util');

const Busboy = require('busboy');

app.post('/api/web_build/upload', (req, res) => {
    console.log(req);
    console.log(req.body);
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
        });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');
        res.writeHead(303, { Connection: 'close', Location: '/' });
        res.end();
    });

    req.pipe(busboy);
    // res.send('success')
})

app.get('/', (req, res) => {

    res.send('Hello world!');
})

app.listen(3000, () => {
    console.log('starting...')
})