var express = require('express')
var session = require('express-session')
var path = require('path')
var moment = require('moment')
moment.locale('fr'); // 'fr'
var app = express();
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser')

const client = require('./src/routes/client')
const stats = require('./src/routes/stats')
const admin = require('./src/routes/admin')

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
app.use(express.static(__dirname + '/src/css'))
app.use(express.static(__dirname + '/node_modules'))

// session
app.use(session({
    secret: 'EPSI2017ERNOUFMONTOUXMOREAUVIBERT',
    resave: true,
    saveUninitialized: true
}));

// HOME

app.get('/',function (req,res){
  res.render('index')
})


// AUTRES ROUTES

app.use(client)
app.use(stats)
app.use(admin)

var utilisateurs = [];
var derniersIndices = [];
id = 0;

var countDownDate = null;

io.on('connection', function(socket) { 
    io.sockets.emit('rafraichirStats',utilisateurs)
    io.sockets.emit('getDerniersIndices',derniersIndices)
    if(countDownDate != null)
        io.sockets.emit('timer', countDownDate);


    socket.on('join', function(nom) {
        utilisateurs.push({
            timestamp:timestamp(),
            nom:nom,
            id : id
        })
        io.sockets.emit('rafraichirStats',utilisateurs)
        socket.on('disconnect',function(){
            utilisateurs.splice(utilisateurs.indexOf(nom), 1);
            io.sockets.emit('rafraichirStats',utilisateurs)
        })
    });

    socket.on('envoyerIndice', function(message){
        derniersIndices.push({
            timestamp:timestamp(),
            message:message
        })
        io.sockets.emit('getDerniersIndices',derniersIndices)
        io.sockets.emit('envoyerIndiceClient',message)
    })

    socket.on('startTimer', function(){
         countDownDate = moment().add(15, 'minutes').format('x');
         io.sockets.emit('timer', countDownDate);
    })

});

function timestamp(){
    return {
        date:moment().format('Do MMMM YYYY'), 
        temps: moment().format('H:mm')}
}

module.exports = server