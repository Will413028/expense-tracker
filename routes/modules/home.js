const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
    Record.find({ userId: req.user._id }) // modify this
        .populate('categoryId')
        .lean()
        .then(records => res.render('index', { records }))
        .catch(error => console.error(error))
})

// filter
router.get('/filter', async (req, res) => {
    const userId = req.user._id
    const category = req.query.category
    const filteredCategory = (req.query.category === '全部') ? '' : await Category.findOne({ name: req.query.category }).lean()
    const filter = (filteredCategory === '') ? { userId } : { userId, categoryId: filteredCategory._id }
    Record.find(filter)
        .populate('categoryId')
        .lean()
        .then(records => res.render('index', { records, category }))
        .catch(error => console.error(error))
})

module.exports = router

// const express = require('express')
// const router = express.Router()
// const moment = require("moment");
//
// const Record = require('../../models/Record')
// const Category = require('../../models/category')
//
// const CATEGORY = {
//     'Home & Utilities': "fas fa-home",
//     'Transportation': "fas fa-shuttle-van",
// 'Leisure & Entertainment': "fas fa-grin-beam",
// 'Restaurant & Dining': "fas fa-utensils",
//     'Other': "fas fa-pen"
// }
//
// router.get('/', (req, res) => {
//     Record.find({ userId: req.user._id })
//         .populate('categoryId')
//         .lean()
//         .then(records => res.render('index', { records }))
//         .catch(error => console.error(error))
// })
// // filter
// router.get('/filter', async (req, res) => {
//     const userId = req.user._id
//     const category = req.query.category
//     const filteredCategory = (req.query.category === '全部') ? '' : await Category.findOne({ name: req.query.category }).lean()
//     const filter = (filteredCategory === '') ? { userId } : { userId, categoryId: filteredCategory._id }
//     Record.find(filter)
//         .populate('categoryId')
//         .lean()
//         .then(records => res.render('index', { records, category }))
//         .catch(error => console.error(error))
// })
// // router.get('/', (req, res) => {
// //     const userId = req.user._id
// //     const filteredCategory = req.query.category || ''
// //     let filteredRecord = {}
// //     if (filteredCategory) {
// //         filteredRecord = { 'category': { '$regex': filteredCategory, '$options': 'i' } }
// //     }
// //     Record.find(userId)
// //         .lean()
// //         .then(records => {
// //             records.forEach(record => {
// //                 record.icon = CATEGORY[record.category]
// //                 record.date = moment(record.date).format('YYYY-MM-DD')
// //             })
// //             res.render('index', { records, filteredCategory})
// // })
// //         .catch(error => console.error(error))
// // })

// module.exports = router
