var express = require('express')
var path = require('path')
var app = express();
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser')

const client = require('./src/routes/client')
const stats = require('./src/routes/stats')

// CONFIG
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/src/img'))
app.use(express.static(__dirname + '/src/objects'))
app.use(express.static(__dirname + '/src/js'))

// HOME

app.get('/',function (req,res){
  res.render('index')
})


// AUTRES ROUTES

app.use(client)
app.use(stats)

var utilisateurs = [];

io.on('connection', function(socket) {  
    socket.on('join', function(nom) {
        utilisateurs.push(nom);
        io.sockets.emit('rafraichirStats',utilisateurs)
        socket.on('disconnect',function(){
            utilisateurs.splice(utilisateurs.indexOf(nom), 1);
            io.sockets.emit('rafraichirStats',utilisateurs)
        })
    }); 
});