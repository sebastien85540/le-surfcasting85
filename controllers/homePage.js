// Page d'accueil

const post = require('../database/models/article')
const User= require('../database/models/user')

module.exports = async (req, res) => {
    const utilisateur = await User.findById(req.session.userId)
    const posts = await post.find({}).sort({_id:-1}).limit(3)
    // console.log(utilisateur);
    
    // console.log(posts);
    // console.log(req.session);

    res.render("index",
        { posts, utilisateur }
    )
}