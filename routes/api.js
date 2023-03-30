const router = require('express').Router();

router.use('/movies', require('./api/movies.js'));




module.exports = router;