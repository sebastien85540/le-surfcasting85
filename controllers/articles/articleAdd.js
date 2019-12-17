const user = require('../../database/models/user')

module.exports = async (req, res) => { // ajout d'articles

    const title = "page d'ajout d'article"
    const utilisateur = await user.findById(req.session.userId)
    if (req.session.userId) {
        return res.render("articles/add", {utilisateur, title})
    }
    console.log(User);
    
    res.redirect('/users/login')
}