var express = require('express')
var path = require('path')
var app = express();
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

const client = require('./src/routes/client')
const stats = require('./src/routes/stats')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(__dirname + '/src/img'))
app.use(express.static(__dirname + '/src/objects'))
app.use(express.static(__dirname + '/src/js'))
app.use(express.static(__dirname + '/node_modules'));

// HOME

app.get('/',function (req,res){
  res.render('index')
})


// AUTRES ROUTES

app.use(client)
app.use(stats)

//
var clients = [];

io.sockets.on('connect', function(client) {
    clients.push(client);
    client.on('disconnect', function() {
        clients.splice(clients.indexOf(client), 1);
    });
});

