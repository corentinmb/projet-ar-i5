const client = require('express').Router();

client.get('/client', function (req, res) {
    res.render('client');
})

module.exports = client;