const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Record = require('./models/Record')
const bodyParser = require('body-parser')

const app = express()
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
    Record.find() // 取出 Todo model 裡的所有資料
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(records => res.render('index', { records })) // 將資料傳給 index 樣板
        .catch(error => console.error(error)) // 錯誤處理
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

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000.')
})