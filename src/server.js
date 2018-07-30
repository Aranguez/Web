const express = require('express')
const cors = require('cors')
const path = require('path')
const multer = require('multer')
//const Producto = require('./models/file.model')

const routes = require('./routes/routes')
const mailRoutes = require('./routes/mail-route')
const registerRoutes = require('./routes/registro')

const mongoose = require('mongoose')

//const passport = require('passport')
//const passportSetup = require('./config/passport-setup')
//const cookieSession = require('cookie-session')
//const cookieParser = require('cookie-parser')

const morgan = require('morgan')

//multer things
/*const storage = multer.diskStorage({
    destination: path.join(__dirname, '/public/uploads/'), //volver separarlo y tener cuidado con la direccion !!
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// init upload variable
const upload = multer({
    storage: storage
}).single('imgfile')*/

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

//mongoose.connect('mongodb://Arantar:Aranguezps2@ds215019.mlab.com:15019/nn-oauth-test', () => console.log('conectado a mongodb mlab') )
//mongoose.connect('mongodb://localhost/usuariosLocal', () => console.log('conectado a mongodb local') )

app.set('port', process.env.port || 3000)

//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./src/public'))

//cookie-session
/*app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['thenetninjaisawesomeiguess']
}))

app.use(passport.initialize())
app.use(passport.session())
*/


//subir imagenes ((( tratar de hacerlo en otro archivo, por el orden nomás, este es el archivo de la app )))
//routes
app.get('/galeria', (req, res) => {
    /*Producto.find({}).then((productos) =>{
        //muestro productos
        console.log(productos)
        */res.render('trabajos', {
            user: req.user,
            mensaje: req.body.mensaje
            //productos: productos
        })/*
    })*/

})

app.post('/upload', (req, res, next) => {
    upload(req, res, (err) => {
        if(err){
            res.render('galeria', {mensaje: err})
        } else {
            const producto = new Producto({
                imagenUrl: req.file.filename,
                titulo: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio
            }).save().then((err) => {
                if (err) {return err}
            })
            res.redirect('/galeria')
        }
    })
})

app.use(routes)
app.use(mailRoutes)
app.use(registerRoutes)
app.get('*', (req, res) => {
    res.send('404 not found')
})

app.listen(app.get('port'), ()=>{
    console.log('server corriendo en puerto: ' + app.get('port'))
})
