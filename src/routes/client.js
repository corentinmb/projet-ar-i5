const client = require('express').Router();

client.get('/client', function (req, res) {
    res.render('client');
})

client.get('/client/connect', function (req, res) {
    res.render('client-home');
})

module.exports = client;