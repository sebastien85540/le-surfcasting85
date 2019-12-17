const User = require('../../database/models/user'),
      bcrypt = require('bcrypt');

module.exports = (req, res) => {
    console.log(req.params);
   //  const utilisateur = User.findById(req.params.userId)
//console.log(utilisateur);
console.log(req.params.id);
    if (req.body.password === req.body.password2){

        console.log(req.body.password)        
        bcrypt.hash(req.body.password, 10, (error, hash) => {
            if(error){
                console.log(error);
            }
            req.body.password = hash
          

            User.findUpdate(req.params.usrId, { 'password': req.body.password}, (err, upUser) => {
                if (err) {
                    console.log(err);
                    req.flash('error', 'Une erreur est survenue... veuillez réessayer.')
                    res.redirect('/passe-oublie')
                }else{
                    req.flash('succes', 'Succès ! Vous pouvez maintenant vous connecter avec votre nouveau mot de passe !')
                    res.redirect('/user/login')
                }
            })
        })
    }
}