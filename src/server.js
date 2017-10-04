const express = require('express')
const path = require('path')
const app = express()
const client = require('./routes/client')
const stats = require('./routes/stats')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/img'))
app.use(express.static(__dirname + '/models'))
app.use(express.static(__dirname + '/js'))

// HOME

app.get('/',function (req,res){
  res.render('index')
})


// AUTRES ROUTES

app.get('/client',client)
app.get('/stats',stats)


app.listen(3000, function () {
  console.log('Serveur en fonctionnement sur le port 3000')
})
