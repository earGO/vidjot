const express = require('express'),
    app = express(),
    port = 5000,

    //controllers
    home=require('./controllers/home'),
    about=require('./controllers/about'),
    idea = require('./controllers/idea'),

    //models
    Idea = require('./models/Idea'),

    //middleware
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    exphbs  = require('express-handlebars'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    session = require('express-session');

//Map global promises to get rid of warning
mongoose.Promise = global.Promise;

//connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev',{ useNewUrlParser:true})
    .then(()=> console.log('MongoDB connected!'))
    .catch(err => console.log('error connecting to MongoDB\n',errs));

//activate middleware
app.use(express.static('public'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

//global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Go routing!!!!
//index route
app.get('/',home.home);

//ABOUT route
app.get('/about',about.about);

//Ideas index pages
app.get('/ideas',idea.ideas);

//Add Idea Form
app.get('/ideas/add',idea.addIdea);

//Edit Idea Form
app.get('/ideas/edit/:id',idea.editIdea);

//edit form process
app.put('/ideas/:id',idea.updateIdea)

//delete Idea
app.delete('/ideas/:id',idea.deleteIdea)

//create Idea
app.post('/ideas',idea.postIdea)


//Start an application
app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
});