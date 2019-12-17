const express                 = require('express') // pouvoir se servir de nodejs
    , exphbs                  = require('express-handlebars') // garde la vue et le code separer
    , mongoose                = require('mongoose') // sert a comuniquer entre node et mongodb 
    , bodyParser              = require('body-parser') // parser mes elements et analyse le middleware
    , fileupload              = require("express-fileupload") // telecharger les images
    , expressSession          = require('express-session') // enregistrer un session dans l'Id de session
    , MongoStore              = require('connect-mongo') // collecte les informations du site
    , connectFlash            = require('connect-flash')
    , {stripTags}               = require('./helpers/hbs')
    , morgan                  = require('morgan');

// CONTROLLER
// NAVABAR
const contactController       = require('./controllers/contact')
// NODEMAILER
const email                   = require('./controllers/nodeMailer/email')
    , emailPasseOublie        = require('./controllers/nodeMailer/emailPasseOublie')

// Article
const articleSingleController = require('./controllers/articles/articleSingle') // page article 
    , articleAddController    = require('./controllers/articles/articleAdd') //Ajouter un article en relation avec add.handlebars
    , articlePostController   = require('./controllers/articles/articlePost') // posst l'article
    , homePage                = require('./controllers/homePage') // page d'accueil
    , articlesPage            = require('./controllers/articles/articlePage') // page de plusieurs articles
    , articleEdit             = require('./controllers/articles/articleEdit') // editer un article poster 
    , articleEditPost         = require ('./controllers/articles/articleEditPost')
    , articleDelete           = require('./controllers/articles/articleDelete') // delete l'article 
// User
const userCreate              = require('./controllers/users/userCreate') // creer un nouvel utilisateur 
    , userRegister            = require('./controllers/users/userRegister') // enregistrer un nouvel usager
    , userLogin               = require('./controllers/users/userLogin') // se connecter 
    , userLoginAuth           = require('./controllers/users/userLoginAuth') // authentification usager
    , userLogout              = require('./controllers/users/userLogout') // se deconnecter
    , editProfile             = require('./controllers/admin/profilEdit')
    , editProfilePost         = require('./controllers/admin/profileEditPost')
    , userPassEdit            = require('./controllers/users/userPassEdit')
    , userDelete              = require('./controllers/users/userDelete');

// ADMIN
const profileController       = require('./controllers/admin/profilePage')
    , articlePannel           = require('./controllers/articles/articlesPannel')
    , usersPannel             = require('./controllers/users/usersPannel')
    , adminEdit               = require('./controllers/admin/adminEdit')
    , adminEditPost           = require('./controllers/admin/adminEditPost')
    , adminDeleteUser         = require('./controllers/admin/adminDeleteUser')

// ERREUR 404
const erreur404               = require('./controllers/erreur404')
// MOT DE PASSE OUBLIE
const passeOublie             = require('./controllers/passeOublie')
    , userPassUpdate          = require('./controllers/users/userPassUpdate')

const app                     = express();
// MONGODB
const db                      = require('./config/keys.js').MongoURI

mongoose.set('useCreateIndex', true)
mongoose
    .connect(db, {
        useNewUrlParser: true,
         useUnifiedTopology: true 
    }) // connection avec mongodb localhost et heroku
    .then(() => console.log('Connect MongoDB Cloud')) // renvoi qu'il est connecté a mongodb cloud
    .catch(err => console.log(err)); // renvoi les erreurs


const mongoStore = MongoStore(expressSession) // connection de mongostore

app.use(connectFlash()) // utilise connect flash
// MORGAN
app.use(morgan('dev'))



app.use(expressSession({ // utilise express-session
    secret: 'securite', // code secret 
    name: 'biscuit', // cookie
    saveUninitialized: true,
    resave: false,
    
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(bodyParser.urlencoded({ // utilisation de l'encodage pour camoufler le code secret 
extended: true
}))
app.use(bodyParser.json()) // utilisation du body parser 
app.use(fileupload()) // utilisation pour telecharger une image dans le body

const auth            = require('./middleware/auth') // authentification
    , redirectAuthSuccess = require("./middleware/redirectAuthSuccess") // rediriger sur la reussite dez l'authentification et ses debouches
    , articleValidPost = require('./middleware/articleValidPost')
    
    // HANDLEBARSuserLogout
    var Handlebars        = require("handlebars"); // utilisation d'handlebars
    var MomentHandler     = require("handlebars.moment"); // moment permet de mettre des dates 
    MomentHandler.registerHelpers(Handlebars);
    // limit an array to a maximum of elements (from the start)
    Handlebars.registerHelper('limit', function (arr, limit) { // permet de limiter les publications
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.slice(0, limit);
    });
    
    app.use(express.static('public')); // utilisation d'express pour recuperer les images dans le dossier public
    
    //  ROUTE
    app.engine('handlebars', exphbs({ // utilisation handlebars 
        helpers: {
            stripTags: stripTags
        },  
        defaultLayout: 'main'
    }));
    app.set('view engine', 'handlebars');
    app.use('*', (req, res, next) => { // permet de recuperer la session
        res.locals.user = req.session.userId;
        next();
    })
    
    // MIDDLEWARE
    
    app.use("/articles/post", auth, articleValidPost) // poster un article 
    app.use("/articles/add", auth) // ajouter un article
    
    // GET
    app.get('/', homePage) // page d'accueil
    // MOT DE PASSE OUBLIE
    app.get('/passe-oublie', passeOublie)
    app.post('/passe-oublie/post', emailPasseOublie)
    app.get('/user/password/edit/:id', userPassEdit)
    app.post('/user/password/edit/post/:id', userPassUpdate)
    // ARTICLES
    app.get("/articles", articlesPage) // page multi article
    app.get("/articles/add", auth, articleAddController) // page ajout d'article
    app.get("/articles/:id", articleSingleController) // page articlesingle postee 
    
    
    app.post("/articles/post", articlePostController) // post les articles 
    
    app.get('/article/edit/:id', auth, articleEdit) // editer un article
    // poster l'edition 
    app.post("/article/edit/post/:id", articleEditPost) 
    //app.get('/user/articles', (req, res) => {
        //     res.render('articles/articleUser')
        // })
        // SUPPRIMER L'ARTICLE
        app.get('/article/delete/:id', auth, articleDelete); // page de suppression
        // Users
        app.get('/user/create',redirectAuthSuccess, userCreate) // creer un usager 
        app.post('/user/register',redirectAuthSuccess, userRegister) // registre des utilisateurs
        app.get('/user/login',redirectAuthSuccess, userLogin) // s'authentifier
        app.post('/user/loginAuth',redirectAuthSuccess, userLoginAuth) // possibilité de poster car authentifier
        app.get('/profile/edit', editProfile)
        app.post("/profile/edit/post/:id", editProfilePost)
        app.get('/user/logout', userLogout) // se deconnecter
        app.get('/delete/user/:id', userDelete)
        // ======================================= ADMIN =======================================
        app.get('/profile', profileController)
        app.get('/admin/articles-pannel', articlePannel)
        app.get('/admin/edit/:id', adminEdit)
        app.post('/admin/edit/post/:id', adminEditPost)
        app.get('/admin/delete/user/:id', adminDeleteUser)
        app.get('/admin/users-pannel', auth, usersPannel);
        // CONTACT
        app.get('/contact', contactController)
        // NODEMAILER
        // async..await is not allowed in global scope, must use a wrapper
        app.post('/contact', email)
       
// ERREUR 404
app.use(erreur404)
app.listen(process.env.PORT || 3300, () => { // lire l'ensemble du dossier sur le port 3300 ou heroku ou autre
    console.log("server started on port 3300");
})