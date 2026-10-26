const Funcionario = require('./models/Funcionario')
const { Motorista, Carga, Entrega } = require('./models/rel')
const conn = require('./db/conn')


async function syncDataBase() {
    try{
        await conn.sync({force: true})
        console.log('sincronizando banco')
    }catch(err){
        console.error('erro ao sincronizar', err)
    }finally{
        conn.close()
        console.log('finalizando sincronização')
    }
}

syncDataBase()