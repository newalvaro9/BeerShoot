require('dotenv').config()
const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
var expressValidator = require('express-validator')
const DiscordStrategy = require('./strategies/discordstrategy');
const BotClient = require("./bot/manager.js");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars')
// Init
const app = express()
require('./database/database')
// Settings

const hbs = exphbs.create({});
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.hbs');
hbs.handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  
    operator = options.hash.operator || "==";
  
    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }
  
    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);
  
    var result = operators[operator](lvalue,rvalue);
  
    if( result ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
  });
// Middlwares
app.use(express.urlencoded({extended: false}));
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
// Global Variables
app.use(async (req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.get_user = req.user ? true : false,
    res.locals.user_id = req.user ? req.user.discordId : false,
    res.locals.language = 'ES',
    res.locals.isEnglish = false
    req.BotClient = BotClient;
    next();
})
/* Routes Dir */
//Bot list

const loginRoute = require('./routes/login/auth')


const userRoute = require('./routes/botlist/user/user');
const addbotRoute = require('./routes/botlist/bots/addbot')
const botsRoute = require('./routes/botlist/bots/home')
const searchRoute = require('./routes/botlist/bots/search');
const botsTwoRoute = require('./routes/botlist/bots/bots')
const suggestRoute = require('./routes/botlist/user/suggest');
const logoutRoute = require('./routes/botlist/user/logout');
const editRoute = require('./routes/botlist/bots/editbot');
const apiRoute = require('./routes/botlist/api/init')
const deleteRoute = require('./routes/botlist/bots/delete');

//Server list

const serversRoute = require("./routes/serverlist/index")
const newServerRoute = require("./routes/serverlist/add");
const { estimatedDocumentCount } = require('./database/models/DiscordUser');


// Uso de estas
app.use('/auth', loginRoute)
app.use('/user', userRoute)
app.use('/addbot', addbotRoute)
app.use('/', botsRoute)
app.use('/bots', botsTwoRoute)
app.use('/search', searchRoute)
app.use('/suggest', suggestRoute)
app.use('/logout', logoutRoute)
app.use('/edit', editRoute)
app.use('/api', apiRoute)
app.use('/delete', deleteRoute)
app.get('/discord', (req, res) => { res.redirect('https://discord.gg/CK7n83VBVg') })
app.get('/manager-invite/:id', (req,res)=>{res.redirect(`https://discord.com/api/oauth2/authorize?client_id=739468621331562567&permissions=8&scope=bot&disable_guild_select=true&guild_id=${req.params.id}`)})

app.use('/servers', serversRoute)
app.use('/add-server', newServerRoute)






// Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/bots')
});

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});