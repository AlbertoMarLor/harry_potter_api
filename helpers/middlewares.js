const jwt = require('jsonwebtoken');
const { getById } = require('../models/users.model');

const checkToken = async (req, res, next) => {

    if (!req.headers['authorization']) {
        return res.json({ fatal: 'Debes incluir la cabecera de Authorization' })
    }

    const token = req.headers['authorization'];



    let obj;
    try {
        obj = jwt.verify(token, 'clave ultra secretisima');
        console.log(obj);
    } catch (error) {
        return res.json({ fatal: 'El token es incorrecto' });
    }

    const [result] = await getById(obj.user_id);

    req.user = result[0];

    next();
}
//TODO eliminar el checkadmin en caso de que no vaya a utilizarlo
const checkAdmin = (req, res, next) => {



    if (req.user.role !== 'admin') {
        return res.json({ fatal: 'No tienes permisos' });
    }

    next();


}

module.exports = {
    checkToken, checkAdmin
}