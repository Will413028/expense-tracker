const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000

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
app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
usePassport(app)

app.use(routes)

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})