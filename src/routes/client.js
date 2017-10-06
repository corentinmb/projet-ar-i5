const client = require('express').Router();
var nom = "";

client.get('/client', function (req, res) {
    //console.log(nom)
    if(nom != "")
        res.render('client', {nom: nom});
    else
        res.redirect('/client/connect');
        nom = "";
})

client.post('/client/connect', function (req, res) {
    nom = req.body.nom
    res.redirect('../client');
})

client.get('/client/connect', function (req, res) {
    res.render('client-connect');
})

module.exports = client;




