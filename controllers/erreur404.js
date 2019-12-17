const user = require('../database/models/user')

module.exports = async (req, res) => { 
    const title = "page d'erreur"
    const utilisateur = await user.findById(req.session.userId)// page d'erreur 
res.render('error404',{utilisateur, title})
}