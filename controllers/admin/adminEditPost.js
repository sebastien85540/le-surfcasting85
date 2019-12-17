const adminEdit = require('../../database/models/user')
    , path     = require('path');


module.exports = (req, res) => {
    // console.log(user);
    let User = {
        _id: req.params.id
    }
    adminEdit.findOneAndUpdate(User,{...req.body},function (error, post) {
        if (error) {
            console.log(error);
            return;
        } else {
            console.log("C'est OK");
            // console.log(user);
            
            res.redirect('/profile');
        }})}