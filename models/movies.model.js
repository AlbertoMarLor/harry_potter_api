const getAll = () => {
    return db.query('SELECT * FROM harry_potter.movies;');
}


const getById = (movieId) => {
    return db.query('select * from movies where id = ?',
        [movieId]
    )
}


const create = ({ title, year, image }) => {
    return db.query(`INSERT INTO harry_potter.movies
    (title,
    year,
    image)
    VALUES
    (?,?,?);`,
        [title, year, image]
    )
}

const deleteById = (movieId) => {
    return db.query('DELETE FROM harry_potter.movies WHERE id = ?',
        [movieId]
    )
}


module.exports = { getAll, create, deleteById, getById }