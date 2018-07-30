const router = require('express').Router()
const passport = require('passport')

//router.get('/login', passport.authenticate('local-login'));

router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/perfil',
        failureRedirect: '/',
        failureFlash: true
    }),
    (req, res) => {
        res.redirect('/perfil', {user: req.user})
    }
);

router.get('/registro', (req, res) => {
    res.render('registro', {
        user: req.user,
        mensaje: req.body.mensaje
    })
})

router.post('/registro', passport.authenticate('local-singup'), (req, res) => {
    res.render('registro', {
        user: undefined,
        mensaje: req.body.mensaje
    })
    res.status(200).end()
});

module.exports = router
