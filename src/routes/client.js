const client = require('express').Router();
var nom = "";
var base64Data = "";

client.get('/client', function (req, res) {
    //console.log(nom)
    if(nom != "" && base64Data != ""){
        id=id+1;        
        require("fs").writeFile("src/img/avatars/avatar-"+ id +".png", base64Data, 'base64', function(err) {
        });
        res.render('client', {nom: nom});
    } else{
        res.redirect('/client/connect');
    }
    nom = "";
    base64Data = "";
})

client.post('/client/connect', function (req, res) {
    nom = req.body.nom
    base64Data = req.body.base64.replace(/^data:image\/png;base64,/, "");
    res.redirect('../client');
})

client.get('/client/connect', function (req, res) {
    res.render('client-connect');
})

module.exports = client;




