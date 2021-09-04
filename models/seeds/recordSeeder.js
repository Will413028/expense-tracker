const db = require('../../config/mongoose')
const Record = require('../Record')

const recordList = require('../../records.json')
console.log(recordList.results)



db.once('open', () => {
    recordList.results.forEach(record => {
        Record.create({
            name: record.name,
            date: record.date,
            amount: record.amount,
            category: record.category
        })
    })
    console.log('Done')
})