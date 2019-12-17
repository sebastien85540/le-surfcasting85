// page de l'article seul avec son id

const post = require('../../database/models/article')
    , User = require('../../database/models/user')

module.exports = async (req, res) => {
    const title = "page de l'article"
    const utilisateur = await User.findById(req.session.userId)
        , article = await post.findById(req.params.id);

    res.render('articles/articles', {utilisateur, article, title}
        // console.log(req.params);
    )
}