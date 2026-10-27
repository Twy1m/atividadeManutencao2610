const express = require('express')
const cors = require('cors')
const app = express()

const conn = require('./db/conn')
const hostname = 'localhost'
const PORT = 3000

require('./models/rel')

const authController = require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')
const motoristaController = require('./controller/motorista.controller')
const entregaController = require('./controller/entrega.controller')
const cargaController = require('./controller/carga.controller')
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
app.get('/motorista/id/:id', motoristaController.buscarID)
app.get('/motorista/nome/:nome', motoristaController.buscarNome)
app.patch('/motoristas/:id', motoristaController.atualizar)
app.delete('/motoristas/:id', motoristaController.apagar)

app.post('/carga', cargaController.cadastrar)

app.post('/entrega', entregaController.cadastrar)
app.get('/entregas', entregaController.listar)


//SERVIDOR

app.listen(PORT, hostname, ()=>{
    console.log(`servidor rodando em http://${hostname}:${PORT}`)
})