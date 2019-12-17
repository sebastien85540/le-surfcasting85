const post = require('../../database/models/article')
    , User= require('../../database/models/user');
module.exports = async (req,res) => {
    const title = "page des articles admin"
    const utilisateur = await User.findById(req.session.userId)
    const posts = await post.find({}).sort({_id:-1}).limit(20)

    res.render('articles/articlePannel', {utilisateur, posts, title})
}