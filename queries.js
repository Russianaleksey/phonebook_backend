const Pool = require('pg').Pool
const url = require('url')

const params = url.parse('postgres://nmyxibvbainedv:b879940902d0a7831bcfcbafbcf87253a8e581cb5bca32c1e8ceba2cbfda1f81@ec2-23-21-160-38.compute-1.amazonaws.com:5432/d7lck4qa8f3ei9')
const auth = params.auth.split(':');


const pool = new Pool({
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
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

    pool.query('SELECT * FROM people WHERE id = $1', [id],(error, results) => {
        if(error){
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createPerson = (req, res) => {
    const { name, number } = req.body

    pool.query('INSERT INTO people (name, number) VALUES ($1, $2)', [name, number],(error, results) => {
        if(error){
            throw error
        }
        console.log(res)
        res.status(201).json(req.body)
    })
}

const updatePerson = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, number } = req.body

    pool.query(
        'UPDATE people SET name = $1, number = $2 WHERE id= $3',
        [name, number, id],
        (error, results) => {
            if(error){
                throw error
            }
            res.status(200)
        }
    )
}

const deletePerson = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM people WHERE id = $1', [id],(error, results) => {
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