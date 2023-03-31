const getAll = () => {
    return db.query('SELECT * FROM harry_potter.characters;');
}



module.exports = { getAll }