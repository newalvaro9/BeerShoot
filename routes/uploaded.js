const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render("uploaded")
})

module.exports = router;