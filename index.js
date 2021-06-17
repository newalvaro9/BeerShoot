const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require("path")
require("./database/database")


// Configure template Engine and Main Template File
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
// Setting template Engine
app.set('view engine', 'hbs');
app.use(express.urlencoded({ limit: '50mb', extended: false}));
app.use(express.json({ limit: '50mb' }))

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// routes
const mainRoute = require("./routes/index")
const uploadRoute = require("./routes/upload")


app.use('/', mainRoute)
app.use('/upload', uploadRoute)


// port where app is served
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});