const userEdit = require('../../database/models/user')
    , path     = require('path');


module.exports = async (req, res) => {
    // console.log(user);
    let User = {
        _id: req.params.id
    }    
    const {
        profilePic
    } = req.files
    const uploadFile = path.resolve(__dirname,'..','..', 'public/profile-pics', profilePic.name);
    console.log(req.body);     
    
    profilePic.mv(uploadFile, (error) => {
        userEdit.findOneAndUpdate(User, {
            ...req.body,
            profilePic: `/profile-pics/${profilePic.name}`
        }
        ,
         function (error, post) {
            if (error) {
                console.log(error);
                return;
            } else {
                console.log("C'est OK");
                // console.log(user);
                
                res.redirect('/profile');
            }
        });
    })
}