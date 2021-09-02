const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
    id: {
        type: Number, // 資料型別是字串
        required: true // 這是個必填欄位
    },
    name: {
        type: String,
        required: true// 資料型別是字串
    },
    date: {
        type: Date,
        required: true// 資料型別是字串
    },
    amount: {
        type: Number,
        required: true// 資料型別是字串
    },
    category: {
        type: String // 資料型別是字串
    }
})

module.exports = mongoose.model('Record', recordSchema)