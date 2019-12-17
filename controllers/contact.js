const User= require('../database/models/user')

module.exports = async (req, res) => {
    const title = "page de contact"
    const utilisateur = await User.findById(req.session.userId)
    res.render("contact",
        { utilisateur, title}
    )
    
}

