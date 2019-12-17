const Article = require("../../database/models/article")
    , path    = require('path');


module.exports = async (req, res) => {
    
    let query = {
        _id: req.params.id
    }
    console.log("ok");
    
    console.log(query);
    console.log("c'est bon");
    
    const {image} = req.files// met l'image dans un objet
    const uploadFile = path.resolve(__dirname,'..', '..', 'public/articles', image.name);// recupere l'image pour l'envoyer dans le dossier public
    
    image.mv(uploadFile, (error) => {
        Article.findByIdAndUpdate(query,{
            ...req.body,
            image: `/articles/${image.name}`
        },
        function (error, post) {
            if (error) {
                console.log(error);
                console.log(req.body);
                
                return;
            } else {
                console.log(query);
                
                res.redirect('/articles');
            }
        });
    })
    
}