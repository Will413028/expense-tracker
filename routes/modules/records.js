const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// new.hbs (create)
router.get('/new', (req, res) => {
    return res.render('new')
})
router.post('/', async (req, res) => {
    const categoryObj = await Category.findOne({ name: req.body.category }).lean()
    return Record.create({ ...req.body, categoryId: categoryObj._id, userId: req.user._id })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// edit.hbs (update)
router.get('/:id/edit', (req, res) => {
    Record.findOne({ _id: req.params.id, userId: req.user._id })
        .populate('categoryId')
        .lean()
        .then(record => res.render('edit', { record }))
        .catch(error => console.log(error))
})
router.put('/:id', async (req, res) => {
    const categoryObj = await Category.findOne({ name: req.body.category }).lean()
    return Record.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, { $set: req.body, categoryId: categoryObj._id })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
    return Record.findOneAndRemove({ _id: req.params.id, userId: req.user._id })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router


// const express = require('express')
// const router = express.Router()
//
// const Record = require('../../models/Record')
// const Category = require('../../models/category')
// const moment = require('moment')
//
// router.get('/new', (req, res) => {
//     return res.render('new')
// })
//
// router.post('/new', async (req, res) => {
//     const categoryObj = await Category.findOne({ name: req.body.category }).lean()
//     return Record.create({ ...req.body, categoryId: categoryObj._id, userId: req.user._id })
//         .then(() => res.redirect('/'))
//         .catch(error => console.log(error))
// })

// router.post('/new', (req, res) => {
//     const userId = req.user._id
//     const { name, date, amount, category } = req.body
//     Category.findOne({ name: category })
//         .lean()
//         .then((categoryItem) => {
//             const categoryId = categoryItem._id
//             return categoryId
//         })
//         .then((categoryId) => Record.create({ name, date, amount, categoryId, userId }))
//         .then(() => res.redirect('/'))
//         .catch(error => {
//             console.log(error)
//         })
// })
//
// router.get('/:id/edit', async (req, res) => {
//     const _id = req.params.id
//     const userId = req.user._id
//     Record.findOne({ _id, userId })
//         .populate('categoryId', 'name')
//         .lean()
//         .then((record) => {
//             record.category = record.categoryId.name
//             record.date = moment(record.date).format('YYYY-MM-DD')
//             console.log(record)
//             return record
//         })
//         .then((record) => {
//             res.render('edit', { record })
//         })
//         .catch(error => {
//             console.log(error)
//         })
// })
//
//
// router.put('/:id', (req, res) => {
//     const userId = req.user._id
//     const _id = req.params.id
//     const { name, date, amount, category } = req.body
//
//     Category.findOne({ name: category })
//         .lean()
//         .then((categoryItem) => {
//             const categoryId = categoryItem._id
//             return categoryId
//         })
//         .then((categoryId) => {
//             Record.findOne({ _id, userId })
//                 .then(record => {
//                     record.name = name
//                     record.categoryId = categoryId
//                     record.date = date
//                     record.amount = amount
//                     return record.save()
//                 })
//
//         })
//         .then(() => res.redirect('/'))
//         .catch(error => console.log(error))
// })
//
// router.delete('/:id', (req, res) => {
//     const userId = req.user._id
//     const _id = req.params.id
//     return Record.findOne({ _id, userId })
//         .then((record) => record.remove())
//         .then(() => res.redirect('/'))
//         .catch(error => console.log(error))
// })
// router.post('/', (req, res) => {
//     const { name, date, category, amount } = req.body
//     const userId = req.user._id
//     return Record.create({ name, date, category, amount, userId })
//         .then(() => res.redirect('/'))
//         .catch(error => console.log(error))
// })
//
// router.get('/:id/edit', (req, res) => {
//     const userId = req.user._id
//     const _id = req.params.id
//     return Record.findOne({_id, userId})
//         .lean()
//         .then((record) => res.render('edit', { record }))
//         .catch(error => console.log(error))
// })
//
// router.put('/:id', (req, res) => {
//     const userId = req.user._id
//     const _id = req.params.id
//     const { name, category, date, amount } = req.body
//     return Record.findOne({ _id, userId })
//         .then(record => {
//             record.name = name
//             record.category = category
//             record.date = date
//             record.amount = amount
//             return record.save()
//         })
//         .then(()=> res.redirect(`/`))
//         .catch(error => console.log(error))
// })
//
// router.delete('/:id', (req, res) => {
//     const _id = req.params.id
//     const userId = req.user._id
//     return Record.findOne({ _id, userId })
//         .then(record => record.remove())
//         .then(() => res.redirect('/'))
//         .catch(error => console.log(error))
// })
//
// module.exports = router






