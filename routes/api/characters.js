const router = require('express').Router();

const { checkToken } = require('../../helpers/middlewares');
const { getAll, updateById, getById, create, deleteById } = require('../../models/characters.model');


router.get('/', checkToken, async (req, res) => {

    try {
        const [movies] = await getAll();

        res.json(movies);
    } catch (error) {
        res.json({ fatal: error.message })
    }




});

router.get('/:characterId', async (req, res) => {

    const { characterId } = req.params;
    try {
        const [result] = await getById(characterId);
        if (result.length === 0) {
            return res.json({ fatal: 'No existe personaje con ese ID' })
        }
        res.json(result[0]);
    } catch (error) {
        res.json({ fatal: error.message })
    }




});


router.post('/newCharacter', async (req, res) => {


    try {
        const [newCharacter] = await create(req.body);
        const [character] = await getById(newCharacter.insertId);
        res.json(character[0]);
    } catch (error) {
        res.json({ fatal: error.message })
    }

});



router.put('/:characterId', async (req, res) => {

    const { characterId } = req.params;

    try {
        await updateById(characterId, req.body);
        const [character] = await getById(characterId);

        res.json(character[0]);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});


router.delete('/:characterId', async (req, res) => {

    const { characterId } = req.params;
    try {
        const [character] = await getById(characterId);
        if (character.length === 0) {
            return res.json({ fatal: 'No existe un personaje con ese ID' });

        }

        await deleteById(characterId);

        res.json(character[0]);
    } catch (error) {
        res.json({ fatal: error.message })
    }

});


module.exports = router;