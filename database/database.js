require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('Conectado a MongoDB'))
.catch(err => console.error(err))