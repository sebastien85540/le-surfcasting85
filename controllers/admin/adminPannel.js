const User= require('../../database/models/user')

module.exports = async (req,res) =>{
    const utilisateur = await User.findById(req.params.id)


    res.render('admins/adminPannel', {utilisateur})
}