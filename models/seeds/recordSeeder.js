const Record = require('../record')
const db = require('../../config/mongoose')

const recordList = [
    {
    name: "AMC",
    date: new Date("2021-08-12"),
    amount: 20,
    category: "Leisure & Entertainment"
    },
    {
        name: "Burger King",
        date: new Date("2021-08-12"),
        amount: 15,
        category: "Restaurant & Dining"
    },
    {
        name: "Metro",
        date: new Date("2021-08-11"),
        amount: 120,
        category: "Transportation"
    },
    {
        name: "Traffic ticket",
        date: new Date("2021-09-01"),
        amount: 220,
        category: "Other"
    },
    {
        name: "Tello",
        date: new Date("2021-09-01"),
        amount: 10,
        category: "Home & Utilities"
    }]



db.once('open', () => {
    recordList.forEach(record => {
        Record.create({
            name: record.name,
            date: record.date,
            amount: record.amount,
            category: record.category
        })
    })
    console.log('Done')
})