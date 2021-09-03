const express = require('express')
const router = express.Router()
const moment = require("moment");

const Record = require('../../models/Record')

router.get('/', (req, res) => {
    let totalAmount = 0
    Record.find()
        .lean()
        .then(records => {
            records.forEach(record => {
                totalAmount += record.amount
                record.date = moment(record.date).format('YYYY-MM-DD')
            })
            res.render('index', { records, totalAmount})
})
        .catch(error => console.error(error))
})

module.exports = router
