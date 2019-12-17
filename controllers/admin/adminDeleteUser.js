const User = require('../../database/models/user')


module.exports = async (req, res) => {
   
    const adminId = await User.findById(req.params.id)

    User.findByIdAndRemove(adminId,{ useFindAndModify: false }, function (err) {
        if (err)
            throw err;
    })
        console.log(adminId);

    res.redirect('/admin/users-pannel')


}