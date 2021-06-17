const router = require('express').Router();
const imageDB = require("../models/imageDB")

function crear() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  

router.get('/', async (req, res) => {
    res.render("upload")
});

router.post('/', async (req, res) => {
    const newurl = crear()
    const {imagen} = req.body;
    const modelsav = await new imageDB({
        url: newurl,
        image: imagen,
        dateNow: Date.now()
    })
    await modelsav.save()
    res.render("uploaded", {url: newurl})
})

module.exports = router