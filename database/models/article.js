// Modele d'article
const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    author: String,
    createDate: {
        type: Date,
        default: new Date()
    }

})
const article = mongoose.model('article', articleSchema)

module.exports = article