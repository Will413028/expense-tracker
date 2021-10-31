const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const PORT = process.env.PORT || 3000

require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs' ,
    helpers: {
        'isEqual': function(a, b) {
            return a === b
        },
        'dateFormate': function (date) {
            return date.toJSON().substring(0, 10)
        }
    }
}))

app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)
app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})