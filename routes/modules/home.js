const express = require('express')
const router = express.Router()
const moment = require("moment");

const Record = require('../../models/Record')

const CATEGORY = {
    'Home & Utilities': "fas fa-home",
    'Transportation': "fas fa-shuttle-van",
'Leisure & Entertainment': "fas fa-grin-beam",
'Restaurant & Dining': "fas fa-utensils",
    'Other': "fas fa-pen"
}

router.get('/', (req, res) => {
    let totalAmount = 0
    const filteredCategory = req.query.category || ''
    let filteredRecord = {}
    if (filteredCategory) {
        filteredRecord = { 'category': { '$regex': filteredCategory, '$options': 'i' } }
    }
    Record.find(filteredRecord)
        .lean()
        .then(records => {
            records.forEach(record => {
                totalAmount += record.amount
                record.icon = CATEGORY[record.category]
                record.date = moment(record.date).format('YYYY-MM-DD')
            })
            res.render('index', { records, totalAmount, filteredCategory})
})
        .catch(error => console.error(error))
})

module.exports = router
