const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/img'))
app.use(express.static(__dirname + '/models'))
app.use(express.static(__dirname + '/js'))

// HOME

app.get('/', function (req, res) {
  res.render('index');
})

// CLIENT

app.get('/client', function (req, res) {
  res.render('client');
})

// STATS

app.get('/stats', function (req, res) {
  res.render('stats');
})

app.listen(3000, function () {
  console.log('Serveur en fonctionnement sur le port 3000')
})
