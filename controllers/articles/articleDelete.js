const article = require('../../database/models/article') // supprime les posts

module.exports = async (req, res) => {
    const articleId = await article.findById(req.params.id)
       
    
       

       article.findByIdAndDelete(articleId, function (err) {
           if (err)
               throw err;
       })
    
       res.redirect('/admin/articles-pannel')

}