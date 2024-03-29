var sslRedirect = require('heroku-ssl-redirect')
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
app.use(bodyParser.urlencoded({ limit: '50mb',extended: false }))

// parse application/json
app.use(bodyParser.json({limit: '50mb'}))

// enable ssl redirect
app.use(sslRedirect());

app.use(express.static(__dirname + '/src/img'))
app.use(express.static(__dirname + '/src/models'))
app.use(express.static(__dirname + '/src/js'))
app.use(express.static(__dirname + '/src/css'))
app.use(express.static(__dirname + '/src/audio'))
app.use(express.static(__dirname + '/node_modules'))

// session
app.use(session({
    secret: 'EPSI2017ERNOUFMONTOUXMOREAUVIBERT',
    resave: true,
    saveUninitialized: true
}));

// HOME

app.get('/',function (req,res){
  res.render('index',{partieEnCours: partieLancee, timer: countDownDate ? countDownDate : undefined});
})


// AUTRES ROUTES

app.use(client)
app.use(stats)
app.use(admin)

var utilisateurs = [];
var derniersIndices = [];
scenario = 1;
partieLancee = false;
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
        io.sockets.emit('envoyerIndiceClient', message)
        io.sockets.emit('envoyerIndiceStats', message)
    })

    socket.on('startTimer', function(){
         countDownDate = moment().add(15, 'minutes').format('x');
         io.sockets.emit('timer', countDownDate);
         io.sockets.emit('scenario', scenario);
         partieLancee=true;
    })
    socket.on('stopTimer', function(){
         countDownDate = undefined;
         io.sockets.emit('timer', countDownDate);
         partieLancee=false;
    })
    socket.on('findkey', function(){
        io.sockets.emit('findkey_server',scenario);
    })

});

function timestamp(){
    return {
        date:moment().format('Do MMMM YYYY'), 
        temps: moment().format('H:mm')}
}

module.exports = server