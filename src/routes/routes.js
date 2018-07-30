const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('home', {
        user: req.user,
        mensaje: req.body.mensaje
    })
})

module.exports = router;
