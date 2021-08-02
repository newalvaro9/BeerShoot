require('./database/database')
const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const expressValidator = require('express-validator')
const mime = require('mime-types')
var serveStatic = require('serve-static')
require('dotenv').config()
const cors = require('cors')
const DiscordStrategy = require('./strategies/discordstrategy');
const app = express();

/*function checkHttps(req, res, next){
  // protocol check, if http, redirect to https
  
  if(req.get('X-Forwarded-Proto').indexOf("https")!=-1){
    return next()
  } else {
    res.redirect('https://' + 'auralist.ml' + req.url);
  }
}

app.all('*', checkHttps); */







// Settings
app.set('port', 3000);
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
  },
}));


// Middlwares
app.use(fileupload());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'mysecretapp',
    cookie: {
      maxAge: 60000 * 60 + 24
    },
    saveUninitialized: true,
    resave: true,
    name: 'discord.oauth2'
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors({
  origin: 'http://localhost:3000/'
}))
app.use(serveStatic(path.join(__dirname, 'public')))

// Routes Dir
const homeRoute = require('./routes/home')
const loginRoute = require('./routes/auth')
const imagesRoute = require('./routes/images')

// Routes
app.use('/', homeRoute)
app.use('/auth', loginRoute)
app.use('/images', imagesRoute)

app.get("*", (req, res) => { res.render('404', {titulo: "404 | Pro Code"}) });
// Static Files





app.post("*", (req,res)=>{res.redirect('http://' + 'localhost:3000' + req.url);})

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});