const router = require('express').Router();
const imageDB = require("../models/imageDB")

router.get('/', async (req, res) => {
    res.render("home")
});

router.get('/:id', function (req, res, next) {
if(req.params.id == "upload") return res.render("upload")


let img = imageDB.findOne({ url: req.params.id })
    if(!img) return res.sendStatus(404)
    let thumb = Buffer.from(img.toString(), 'base64');
    console.log(thumb)
    res.writeHeader(200,{
        'Content-Type': 'image/png',
        'Content-Length': thumb.length
      }).end(thumb)
});

module.exports = router