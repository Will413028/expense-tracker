
module.exports = {
    isEqual: function (a, b) {
        if (a === b) {
            return true
        } else {
            return false
        }
    },
    totalAmount: function (records) {
        let totalAmount = 0
        records.forEach(record => {
            totalAmount += Number(record.amount)
        })
        return totalAmount
    },
    dateFormate: function (date) {
        return date.toJSON().substring(0, 10)
    },
}