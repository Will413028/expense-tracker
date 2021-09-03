// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Record = require('../../models/Record')
// 定義首頁路由
router.get('/', (req, res) => {
    let totalAmount = 0
    Record.find()
        .lean()
        .then(records => {
            records.forEach(record => {
                totalAmount += record.amount
            })
            res.render('index', { records, totalAmount})
})
        .catch(error => console.error(error))
})
// 匯出路由模組
module.exports = router
