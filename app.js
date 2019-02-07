const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    app = express(),
    port = 5000,
//controllers
    home=require('./controllers/home'),
    about=require('./controllers/about'),
    idea = require('./controllers/idea'),
    exphbs  = require('express-handlebars'),
    methodOverride = require('method-override');

//Map global promises to get rid of warning
mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev',{ useNewUrlParser:true})
    .then(()=> console.log('MongoDB connected!'))
    .catch(err => console.log('error connecting to MongoDB\n',errs));

//Load models
const Idea = require('./models/Idea');

app.use(express.static('public'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(methodOverride('_method'))


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

app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
});