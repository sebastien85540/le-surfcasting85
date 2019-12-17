const edit = require ("../../database/models/user");

module.exports = async (req,res) => {
  const title = "page d'édition de profil"
  const utilisateur = await edit.findById(req.session.userId)
  

  res.render ('admins/users/userEdit', {utilisateur,title}) 
};