const router = require('express').Router();

const { getAll } = require('../../models/characters.model');


router.get('/', async (req, res) => {

    try {
        const [movies] = await getAll();

        res.json(movies);
    } catch (error) {
        res.json({ fatal: error.message })
    }




});

module.exports = router;