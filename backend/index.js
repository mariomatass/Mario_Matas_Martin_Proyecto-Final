//importo el express y el cors
const express = require('express')
const cors = require('cors')
//importo el fichero login.js que está en la carpeta services
const login = require('./services/login')
const item = require('./services/item')

//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port = 3030

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())



//Ejemplo para ver cómo funciona un endpoint:
//este endpoint es / y devuelve un mensaje
app.get('/', function (req, res) {
    res.json({ message: 'Hola Mundo!' })
})

//Creación del endpoint /login
//llama al fichero login.js usando el método getUserData pasándole
//el login (user) y la contraseña (password)
app.get('/login', async function (req, res, next) {
    console.log(req.query)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})

app.get('/addItem', async function (req, res, next) {
    try {
        res.json(await item.insertData(req))
        console.log('Se envia el req al addItem')
    } catch (err) {
        console.error(`Error while inserting items `, err.message);
        next(err);
    }
    //En el frontend llamar al backend con la función fetch() cuando se pique el botón de
})

app.get('/adduser', async function (req, res, next) {
    try {
        res.json(await item.insertUser(req))
        console.log('Se envia el req al addprueba')
    } catch (err) {
        console.error(`Error while inserting items `, err.message);
        next(err);
    }
    //En el frontend llamar al backend con la función fetch() cuando se pique el botón de
})

app.get('/getItems', async function (req, res, next) {
    try {
        res.json(await item.getData())
    } catch (err) {
        console.error(`Error while getting items `, err.message);
        next(err);
    }
    //En el frontend llamar al backend con la función fetch() cuando se pique el botón de
})
app.get('/getuser', async function (req, res, next) {
    try {
        res.json(await item.getUser())
    } catch (err) {
        console.error(`Error while getting items `, err.message);
        next(err);
    }
    //En el frontend llamar al backend con la función fetch() cuando se pique el botón de
})

app.get('/deleteItem', async function (req, res, next) {
    try {
        res.json(await item.deleteData(req))
    } catch (err) {
        console.error(`Error while deleting items `, err.message);
        next(err);
    }
    //En el frontend llamar al backend con la función fetch() cuando se pique el botón de
})

//Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)