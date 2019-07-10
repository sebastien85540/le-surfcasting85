const article = require('../../database/models/article') // supprime les posts

module.exports = (req, res) => {

       let articleId = req.params.id;

       article.findByIdAndDelete(articleId, function (err) {
           if (err)
               throw err;
       })
    
       res.redirect('/articles')

}