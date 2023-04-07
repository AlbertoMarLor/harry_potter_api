const create = ({ username, email, password, role }) => {
    return db.query(`INSERT INTO users
(username,
email,
password, role
)
values (?,?,?,?)
`,
        [username, email, password, role]

    )
}

const getById = (userId) => {
    return db.query('select * from users where id = ?', [userId]);
}


const getByEmail = (userEmail) => {
    return db.query('select * from users where email = ?', [userEmail])
}


module.exports = { create, getById, getByEmail }