const router = require('express').Router();

router.use('/movies', require('./api/movies.js'));
router.use('/characters', require('./api/characters.js'));
router.use('/users', require('./api/users.js'));



module.exports = router;