//DEPLOYED TO HEROKU: https://vast-brook-19602.herokuapp.com/
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors');
const db = require('./queries');

app.use(cors())
app.use(bodyParser.json())
morgan.token('postBody', (req, res) => { return `${JSON.stringify(req.body)}` })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody'))
app.use(express.static('build'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        id: 1
    },
    {
        "name": "Ada Lovelace",
        "number": "127-22301",
        id: 2
    },
    {
        "name": "Dan Abramov",
        "number": "923-123951",
        id: 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "042-123456",
        id: 4
    },   
]

app.get('/', (req, res) => {
    res.send('<h1>MAIN PAGE</h1>')
})

app.get('/api/persons', db.getPeople)
app.get('/api/persons/:id', db.getPersonById)
app.post('/api/persons', db.createPerson)
app.put('/api/persons/:id', db.updatePerson)
app.delete('/api/persons/:id', db.deletePerson)

const getInfo = () => {
    return(
        `
        <div>
            <h4>Phonebook has info for ${persons.length} people</h4>
            <p>${new Date()}</p>
        </div>
        `
    )
}

app.get('/info', (req, res) => {
    res.send(getInfo())
})

/*
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(per => per.id !== id)

    res.status(204).end()
})


const getRandomID = () => {
    return Math.floor((Math.random() * 1000000) + 1)
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if(!body.name || !body.number){
        return res.status(400).json({
            error: "name or number missing"
        })
    } else if(persons.find(per => per.name === body.name)){
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        name: body.name,
        number: body.number || false,
        id: getRandomID()
    }

    persons = persons.concat(person)
    
    res.json(person)
})
*/

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint '})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
