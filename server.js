const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const routes = require('./routes')

const db = require('./models')
const Role = db.role

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT || 8080

var corsOptions = {
    origin: 'http://localhost:8081',
}

mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Successfully connect to MongoDB.')
        initial()
    })
    .catch(err => {
        console.error('Connection error', err)
        process.exit()
    })

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', routes)
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: 'user',
            }).save(err => {
                if (err) {
                    console.log('error', err)
                }

                console.log("added 'user' to roles collection")
            })

            new Role({
                name: 'admin',
            }).save(err => {
                if (err) {
                    console.log('error', err)
                }

                console.log("added 'admin' to roles collection")
            })
        }
    })
}
