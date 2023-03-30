const router = require('express').Router();


router.get('/', (req, res) => {

    res.send('GET MOVIES');
});



module.exports = router;