const adminEdit = require ("../../database/models/user");

module.exports =async (req,res) => {
  const title = "page d'edition administrateur"

  const utilisateur = await adminEdit.findById(req.params.id)
  
console.log(adminEdit);

  res.render ('admins/users/adminEdit', {utilisateur,title}) 
};