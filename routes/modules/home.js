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

router.get('/filter', async (req, res) => {
    const userId = req.user._id
    const category = req.query.category
    const filteredCategory = (req.query.category === 'All') ? '' : await Category.findOne({ name: req.query.category }).lean()
    const filter = (filteredCategory === '') ? { userId } : { userId, categoryId: filteredCategory._id }
    Record.find(filter)
        .populate('categoryId')
        .lean()
        .then(records => res.render('index', { records, category }))
        .catch(error => console.error(error))
})

module.exports = router