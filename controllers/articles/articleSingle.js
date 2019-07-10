// page de l'article seul avec son id

const post = require('../../database/models/article')

module.exports = async (req, res) => {
    
    const article = await post.findById(req.params.id)

    res.render('articles/articles', { article }
        // console.log(req.params);
    )
}