// Authentification pour pouvoir poster un article apres s'etre identifier 

const bcrypt = require('bcrypt')
    , user = require('../../database/models/user')


module.exports = (req, res) => {
    const { email, password } = req.body;

    user.findOne({ email }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    if(user.accountType == "admin") {
                        req.session.userId = user._id
                        res.redirect('/admin/pannel')
                    }else if (user.accountType == "user") {
                        req.session.userId = user._id
                        res.redirect('/user/pannel')
                    }
                }
                else {
                    res.redirect('/user/login')
                }
            })
         } 
    })
}