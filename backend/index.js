const express = require('express')
const cors = require('cors')
const app = express()

const conn = require('./db/conn')
const hostname = 'localhost'
const PORT = 3000

const authController = require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')
const motoristaController = require('./controller/motorista.controller')
const authMiddleware = require('./middleware/auth.middleware')

//MIDDLEWARE

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//ROTAS PUBLICAS

app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.use(authMiddleware)

//ROTAS PRIVADAS

app.post('/motorista', motoristaController.cadastrar)
app.get('/motoristas', motoristaController.listar)

app.listen(PORT, hostname, ()=>{
    console.log(`servidor rodando em http://${hostname}:${PORT}`)
})