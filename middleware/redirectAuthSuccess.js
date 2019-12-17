// l'Usager a ete verifie donc il peut poster

//const user = require('../database/models/user')

module.exports = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/profile ')
    } 
    next()
}