const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'phonebook_api',
    password: 'password',
    port: 5432,
})

const getPeople = (req, res) => {
    pool.query('SELECT * FROM people ORDER BY id ASC', (error, results) => {
        if (error){
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getPersonById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(`SELECT * FROM people WHERE id = ${id}`, (error, results) => {
        if(error){
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createPerson = (req, res) => {
    const { name, number } = req.body

    pool.query(`INSERT INTO people (name, number) VALUES ${name, number}`, (error, results) => {
        if(error){
            throw error
        }

        res.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updatePerson = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, number } = req.body

    pool.query(
        `UPDATE people SET name = ${name}, number = ${number} WHERE id= ${id}`,
        (error, results) => {
            if(error){
                throw error
            }
            res.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deletePerson = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(`DELETE FROM people WHERE id = ${id}`, (error, results) => {
        if(error){
            throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getPeople,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson,
}