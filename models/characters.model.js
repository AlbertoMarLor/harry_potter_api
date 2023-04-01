const getAll = () => {
    return db.query('SELECT * FROM harry_potter.characters;');
}

const getById = (characterId) => {
    return db.query('select * from characters where id = ?',
        [characterId]
    )
}

const updateById = (characterId, { name, type, image, status }) => {
    return db.query(
        `update characters set
        name = ?,
        type = ?,
        image = ?,
        status = ?
        where id = ?`,
        [name, type, image, status, characterId]
    )
}


const create = ({ name, type, image, status }) => {
    return db.query(`INSERT INTO harry_potter.characters
    (name,
    type,
    image, 
    status)
    VALUES
    (?,?,?,?);`,
        [name, type, image, status]
    )
}

const deleteById = (characterId) => {
    return db.query('DELETE FROM harry_potter.characters WHERE id = ?',
        [characterId]
    )
}

module.exports = { getAll, updateById, getById, create, deleteById }