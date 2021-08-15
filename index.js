const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require("path")
const serveStatic = require('serve-static')
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const cors = require('cors')
require("./database/database")


// Configure template Engine and Main Template File
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

// Setting template Engine
app.set('view engine', 'hbs');
app.use(fileupload());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:3000/'
}))

app.use(serveStatic(path.join(__dirname, 'public')))
  
// Routes Dir
const homeRoute = require('./routes/home')

  
// Routes
app.use('/', homeRoute)

  



// port where app is served
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});