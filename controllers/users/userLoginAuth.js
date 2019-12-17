// Authentification pour pouvoir poster un article apres s'etre identifier 

const bcrypt = require('bcrypt')
    , user = require('../../database/models/user')


module.exports = (req, res) => {
    const { email, password } = req.body;

    user.findOne({ email }, (error, user) => {
        console.log(error);
        
        // const registerError = Object.keys(error.errors).map(key  => error.errors[key].message);
        //     req.flash('registerError', registerError)
        //     req.flash('data', req.body)
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    if(user.accountType === "admin") {
                        req.session.userId = user._id
                        res.redirect('/profile')
                    }else if (user.accountType === "user") {
                        req.session.userId = user._id
                        res.redirect('/profile')
                    }
                }
                else {
                    res.redirect('/user/login')
                }
            })
            } else {
                res.redirect('/user/login')
            }
            
    })
}