const User= require('../../database/models/user');
module.exports = async (req,res) => {
    const title = "page du pannel d'utilisateur"
    const utilisateur = await User.findById(req.session.userId)
    const user = await User.find({})
    console.log(user);
    

    res.render('admins/users/usersPannel',{utilisateur,user, title})
}