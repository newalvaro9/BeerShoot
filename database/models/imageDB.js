const mongoose = require('mongoose');

const ImageDB = new mongoose.Schema({
    url: {type: String},
    image: {type: Buffer},
    dateNow: {type: Number}
})

module.exports = mongoose.model('ImageDB', ImageDB)