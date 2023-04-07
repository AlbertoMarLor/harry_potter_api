const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { create, getById, getByEmail } = require('../../models/users.model');
const { createToken } = require('../../helpers/utils');









router.post('/register', async (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 8);


    try {
        const [result] = await create(req.body);
        const [newUser] = await getById(result.insertId)

        res.json(newUser[0]);
    } catch (error) {
        res.json({ fatal: error.message })
    }


});



router.post('/login', async (req, res) => {
    try {

        const [result] = await getByEmail(req.body.email);
        if (result.length === 0) {
            return res.json({ fatal: 'error en email/contraseña' });
        }

        const usuario = result[0];


        const iguales = bcrypt.compareSync(req.body.password, usuario.password);
        if (!iguales) {
            return res.json({ fatal: 'error en email/contraseña' });
        }

        res.json({
            success: 'Login correcto',
            token: createToken(usuario)
        });


    } catch (error) {
        res.json({ fatal: error.message });
    }
}
)





module.exports = router;