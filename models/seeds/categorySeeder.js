const Category = require('../category')
const db = require('../../config/mongoose')

const categoryData = [
    {
        name: 'Home & Utilities',
        icon: 'fas fa-home'
    },
    {
        name: 'Transportation',
        icon: 'fas fa-shuttle-van'
    },
    {
        name: 'Leisure & Entertainment',
        icon: 'fas fa-grin-beam'
    },
    {
        name: 'Restaurant & Dining',
        icon: 'fas fa-utensils'
    },
    {
        name: 'Other',
        icon: 'fas fa-pen'
    }
]

db.once('open', () => {
    Category.create(categoryData)
        .then(() => {
            console.log('categorySeeder done')
            return db.close()
        })
        .catch((err) => console.error(err))
})