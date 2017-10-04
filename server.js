const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(__dirname + '/js'))
app.use(express.static(__dirname + '/img'))
app.use(express.static(__dirname + '/models'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'/src/', 'index.html'));
})

app.listen(3000, function () {
  console.log('Serveur en fonctionnement sur le port 3000')
})
