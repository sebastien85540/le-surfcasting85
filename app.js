const express                 = require('express')// pouvoir se servir de nodejs
    , exphbs                  = require('express-handlebars')// garde la vue et le code separer
    , mongoose                = require('mongoose')// sert a comuniquer entre node et mongodb 
    , bodyParser              = require('body-parser')// parser mes elements et analyse le middleware
    , fileupload              = require("express-fileupload")// telecharger les images
    , expressSession          = require('express-session')// enregistrer un session dans l'Id de session
    , MongoStore              = require('connect-mongo')// collecte les informations du site
    , connectFlash            = require('connect-flash')
    , morgan                  = require('morgan')
    //, mailer                  = require('nodemailer')

// CONTROLLER
// NAVABAR
const contactController = require('./controllers/contact')
// Article
const articleSingleController = require('./controllers/articles/articleSingle')// page article 
    , articleAddController    = require('./controllers/articles/articleAdd') //Ajouter un article en relation avec add.handlebars
    , articlePostController   = require('./controllers/articles/articlePost') // posst l'article
    , homePage                = require('./controllers/homePage')// page d'accueil
    , articlesPage            = require('./controllers/articles/articlePage')// page de plusieurs articles
    , articleEdit             = require('./controllers/articles/articleEdit')// editer un article poster 
   // , articleEditPost         = require ('./controllers/articleEditPost')
    , articleDelete           = require('./controllers/articles/articleDelete') // delete l'article 
// User
const userCreate              = require('./controllers/users/userCreate')// creer un nouvel utilisateur 
    , userRegister            = require('./controllers/users/userRegister')// enregistrer un nouvel usager
    , userLogin               = require('./controllers/users/userLogin')// se connecter 
    , userLoginAuth           = require('./controllers/users/userLoginAuth')// authentification usager
    , userLogout              = require('./controllers/users/userLogout')// se deconnecter
    , userPannel              = require('./controllers/users/userPannel')

// ADMIN
const adminPannel               = require('./controllers/admin/adminPannel')
,   articlePannel             = require('./controllers/articles/articlesPannel')
    
const app                     = express();
// MONGODB
const db                      = require('./config/keys.js').MongoURI

mongoose.set('useCreateIndex', true)
mongoose    
    .connect(db, {useNewUrlParser: true}) // connection avec mongodb localhost et heroku
    .then(() => console.log('Connect MongoDB Cloud'))// renvoi qu'il est connecté a mongodb cloud
    .catch(err => console.log(err));// renvoi les erreurs
    

const mongoStore = MongoStore(expressSession)// connection de mongostore

app.use(connectFlash())// utilise connect flash
// MORGAN
app.use(morgan('dev'))

// NODEMAILER
      // ADRESSE DE RECEPTION
//var smtpTransport = mailer.createTransport("SMTP",{
    //service: "Gmail",
   // auth: {
   //     user: "surfcastingdu85@gmail.com",
   //     pass: "surfcasting85"
   // }
//});


app.use(expressSession({ // utilise express-session
    secret: 'securite', // code secret 
    name: 'biscuit', // cookie
    saveUninitialized: true,
    resave: false,

    store: new mongoStore(
        {mongooseConnection: mongoose.connection}
    )
}))

app.use(bodyParser.json()) // utilisation du body parser 
app.use(bodyParser.urlencoded({ // utilisation de l'encodage pour camoufler le code secret 
    extended: true
}))
app.use(fileupload()) // utilisation pour telecharger une image dans le body

const auth               = require('./middleware/auth') // authentification
, redirectAuthSuccess    = require("./middleware/redirectAuthSuccess")// rediriger sur la reussite dez l'authentification et ses debouches

// HANDLEBARS
var Handlebars           = require("handlebars"); // utilisation d'handlebars
var MomentHandler        = require("handlebars.moment");// moment permet de mettre des dates 
MomentHandler.registerHelpers(Handlebars);
// limit an array to a maximum of elements (from the start)
Handlebars.registerHelper('limit', function (arr, limit) { // permet de limiter les publications
    if (!Array.isArray(arr)) { return []; }
        return arr.slice(0, limit);
  });

app.use(express.static('public')); // utilisation d'express pour recuperer les images dans le dossier public

//  ROUTE
app.engine('handlebars', exphbs({ // utilisation handlebars 
    
    defaultLayout: 'main'
     }));
app.set('view engine', 'handlebars');
app.use('*', (req, res, next) => { // permet de recuperer la session
    res.locals.user = req.session.userId;
    next();
})

// MIDDLEWARE
const articleValidPost = require('./middleware/articleValidPost')// valider les publications

app.use("/articles/post", auth, articleValidPost)// poster un article 
app.use("/articles/add", auth) // ajouter un article

// GET
app.get('/', homePage)// page d'accueil
app.get('/delete/article/:id', auth, articleDelete);// page de suppression

// ARTICLES
app.get("/articles", articlesPage) // page multi article
app.get("/articles/add", auth, articleAddController) // page ajout d'article
app.get("/articles/:id",auth, articleSingleController) // page articlesingle postee 


app.post("/articles/post", articlePostController)// post les articles 

app.get('/articleEdit/:id', auth, articleEdit) // editer un article
// app.post('/articleEditPost/:id', auth, articleEditPost)// poster l'edition 
// app.post('/articleEditPost/:id', auth, articleEditPost);
app.post("/articleEditPost/:id", function (req, res) {
    const Article = require('./database/models/article');
    const path = require('path')
    let query = { id: req.body.articleId }
    const { image } = req.files
    const uploadFile = path.resolve(__dirname, 'public/articles', image.name);
 
    image.mv(uploadFile, (error) => {
        Article.findOneAndUpdate(query, { ...req.body, image: `/articles/${image.name}` }, function (error, post) {
            if (error) {
                console.log(error);
                return;
            } else {
                console.log("C'est OK");
                res.redirect('/articles');
            }
        });
    })
 });

// Users
app.get('/user/create', redirectAuthSuccess, userCreate) // creer un usager 
app.post('/user/register', redirectAuthSuccess, userRegister)// registre des utilisateurs
app.get('/user/login', redirectAuthSuccess, userLogin) // s'authentifier
app.post('/user/loginAuth', redirectAuthSuccess, userLoginAuth)// possibilité de poster car authentifier
app.get('/user/logout', userLogout)// se deconnecter
app.get('/user/pannel', userPannel)
app.get('/user/articles', (req, res) => {
    res.render('articles/articleUser')
})

// ======================================= ADMIN =======================================
app.get('/admin/pannel', adminPannel)
app.get('/admin/articles-pannel', articlePannel)
// CONTACT
app.get('/contact', contactController)
// ERREUR 404
app.use((req, res) => { // page d'erreur 
    res.render('error404')
})
app.listen(process.env.PORT ||3300, () => {// lire l'ensemble du dossier sur le port 3300 ou heroku ou autre
    console.log("server started on port 3300");

})