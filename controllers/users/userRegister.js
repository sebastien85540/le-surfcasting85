// Verifie l'usager avec son mot de passe 
const user = require('../../database/models/user')

module.exports = (req, res) => {
    user.create(
        req.body, (error,user) => {
            const registerError = Object.keys(error.errors).map(key  => error.errors[key].message);
            req.flash('registerError', registerError)
            req.flash('data', req.body)
        if (error) {
           return res.redirect('/user/create')
        }
        res.redirect('/user/login')
    })    
};