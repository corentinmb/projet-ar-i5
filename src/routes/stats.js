const stats = require('express').Router();

stats.get('/stats', function (req, res) {
    res.render('stats');
})

module.exports = stats;