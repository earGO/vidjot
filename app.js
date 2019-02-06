var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    app = express(),
    port = 5000,
//controllers
    home=require('./controllers/home'),
    about=require('./controllers/about'),
    exphbs  = require('express-handlebars');;

app.use(express.static('public'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//index route
app.get('/',home.home);

//ABOUT route
app.get('/about',about.about);

app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
});