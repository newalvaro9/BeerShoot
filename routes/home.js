const router = require('express').Router();
const imageDB = require("../database/models/imageDB")

function crear() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  


router.get('/', (req, res) => {
    res.render('home')
})

router.get('/upload', (req, res) => {
    res.render('upload')
})

router.get('/:id', async (req, res) => {
    const {id} = req.params.id;
});





router.post('/upload', async (req, res) => {

})

module.exports = router