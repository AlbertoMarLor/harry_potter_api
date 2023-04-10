const router = require('express').Router();

const { checkToken } = require('../../helpers/middlewares');
const { getAll, deleteById, getById } = require('../../models/movies.model');
const { create } = require('../../models/movies.model');




router.get('/', checkToken, async (req, res) => {

    try {
        const [movies] = await getAll();

        res.json(movies);
    } catch (error) {
        res.json({ fatal: error.message })
    }


});


router.get('/:movieId', async (req, res) => {

    const { movieId } = req.params;
    try {
        const [result] = await getById(movieId);
        if (result.length === 0) {
            return res.json({ fatal: 'No existe pelicula con ese ID' })
        }
        res.json(result[0]);
    } catch (error) {
        res.json({ fatal: error.message })
    }




});

router.post('/newMovie', async (req, res) => {


    try {
        const [newMovie] = await create(req.body);
        const [movie] = await getById(newMovie.insertId);
        res.json(movie[0]);
    } catch (error) {
        res.json({ fatal: error.message })
    }

});


router.delete('/:movieId', async (req, res) => {

    const { movieId } = req.params;
    try {
        const [movie] = await getById(movieId);
        if (movie.length === 0) {
            return res.json({ fatal: 'No existe una pelicula con ese ID' });

        }

        await deleteById(movieId);

        res.json(movie[0]);
    } catch (error) {
        res.json({ fatal: error.message })
    }

});


module.exports = router;

