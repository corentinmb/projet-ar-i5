const admin = require('express').Router();

var UTILISATEUR = "admin"
var MDP = "!Epsibdx2017"

// Detection de l'utilisateur
var auth = function(req, res, next) {
  if (req.session && req.session.user === UTILISATEUR && req.session.admin)
    return next();
  else
    return res.redirect('/admin/login')
};

admin.get('/admin', auth, function (req, res) {
    res.render('admin');
})

// Login endpoint
admin.get('/admin/login', function (req, res) {
    if(req.session && req.session.user === UTILISATEUR && req.session.admin){
        res.redirect('/admin')  
    } else {
        if (!req.query.u && !req.query.p) {
            res.render('adminConnexion',{erreur:null})
        } else if(req.query.u === UTILISATEUR && req.query.p === MDP) {
            req.session.user = UTILISATEUR;
            req.session.admin = true;
            res.redirect('/admin')
        }
        else{
            res.render('adminConnexion', {erreur: 'Erreur d\'authentification'})
        }
    }
});
 
// Logout endpoint
admin.get('/admin/logout', function (req, res) {
  req.session.destroy();
  return res.redirect('/')
});

module.exports = admin;