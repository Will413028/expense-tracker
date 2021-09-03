const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Record = require('./models/Record')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    Record.find()
        .lean()
        .then(records => res.render('index', { records }))
        .catch(error => console.error(error))
})

app.get('/records/new', (req, res) => {
    return res.render('new')
})

app.post('/records', (req, res) => {
    const record = new Record({
        name: req.body.name,
        category: req.body.category,
        date: req.body.date,
        amount: req.body.amount
    })

    record.save()
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// edit data
app.get('/records/:id/edit', (req, res) => {
    const id = req.params.id
    Record.findById(id)
        .lean()
        .then((record) => res.render('edit', { record }))
        .catch(error => console.log(error))
})

app.post('/records/:id/edit', (req, res) => {
    const id = req.params.id
    const { name, category, date, amount } = req.body
    Record.findById(id)
        .then(record => {
            record.name = req.body.name
            record.category = req.body.category
            record.date = req.body.date
            record.amount = req.body.amount
            return record.save()
        })
        .then(()=> res.redirect(`/records/${id}`))
        .catch(error => console.log(error))
})

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000.')
})