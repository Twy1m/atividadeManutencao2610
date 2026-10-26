const Motorista = require('../models/Motorista')
const cryptoJs = require('crypto-js')

const cadastrar = async (req, res) => {
    let { nome, cnh, cpf, telefone } = req.body

    if (!nome || !cnh || !cpf || !telefone) {
        return res.status(400).json({ message: 'insira todos os campos necessarios' })
    }

    try {
        let cpfCripto = cryptoJs.AES.encrypt(cpf, "senha").toString()
        let cnhCripto = cryptoJs.AES.encrypt(cnh, "senha").toString()

        Motorista.create({
            nome,
            cnh: cnhCripto,
            cpf: cpfCripto,
            telefone
        })

        res.status(201).json({ message: 'motorista cadastrado com sucesso' })
    } catch (err) {
        console.error('erro ao cadastrar', err)
        res.status(500).json({ message: 'erro ao cadastrar' })
    }
}

const listar = async (req, res)=>{
    try{
        let motoristas = await Motorista.findAll()
        motoristas.forEach(el => {
            el.cnh = cryptoJs.AES.decrypt(el.cnh, "senha").toString(cryptoJs.enc.Utf8)
            el.cpf = cryptoJs.AES.decrypt(el.cpf, "senha").toString(cryptoJs.enc.Utf8)

            motoristas[el] = {
                ...motoristas,
                cnh: el.cnh,
                cpf: el.cpf
            }
        });
        return res.status(200).json(motoristas)
    }catch(err){
        console.error('erro ao listar', err)
        res.status(500).json({message: 'erro ao listar'})
    }
}

const buscarID = async(req, res)=>{
    const id = req.params.id

    if(!id){
        return res.status(400).json({ message: 'insira todos os campos necessarios' })
    }

    try{
        let motorista = await Motorista.findByPK(id)
        if(!motorista){
            return res.status(404).json({ message: 'motorista não encontrado' })
        }

        motorista.forEach(el => {
            el.cnh = cryptoJs.AES.decrypt(el.cnh, "senha").toString(cryptoJs.enc.Utf8)
            el.cpf = cryptoJs.AES.decrypt(el.cpf, "senha").toString(cryptoJs.enc.Utf8)

            motorista[el] = {
                ...motorista,
                cnh: el.cnh,
                cpf: el.cpf
            }
        })

        res.status(200).json(motorista)
    }catch(err){
        console.error('erro ao buscar por id', err)
        res.status(500).json({ message: 'erro ao buscar'})
    }
}

const buscarNome = async(req, res)=>{
    const nome = req.params.nome

    if(!nome){
        return res.status(400).json({ message: 'insira todos os campos necessarios' })
    }

    try{
        let motorista = await Motorista.findOne({where: {nome:nome}})

        if(!motorista){
            return res.status(404).json({ message: 'motorista não encontrado' })
        }

        motorista.forEach(el => {
            el.cnh = cryptoJs.AES.decrypt(el.cnh, "senha").toString(cryptoJs.enc.Utf8)
            el.cpf = cryptoJs.AES.decrypt(el.cpf, "senha").toString(cryptoJs.enc.Utf8)

            motorista[el] = {
                ...motorista,
                cnh: el.cnh,
                cpf: el.cpf
            }
        })
        res.status(200).json(motorista)
    }catch(err){
        console.error('erro ao buscar por nome', err)
        res.status(500).json({ message: 'erro ao buscar'})
    }
}

const atualizar = async(req, res)=>{
    let { nome, cnh, cpf, telefone } = req.body
    let id = req.params.id

    if (!nome || !cnh || !cpf || !telefone) {
        return res.status(400).json({ message: 'insira todos os campos necessarios' })
    }

    try{
        const motorista = await findByPK(id)
        if(!motorista) {
            return res.status(404).json({message: 'motorista não encontrado'})
        }

        await motorista.update({
            nome,
            cnh,
            cpf,
            telefone
        })

        res.status(200).json(motorista)
    }catch(err){
        console.error('erro ao atualizar', err)
        res.status(500).json({ message: 'erro ao atualizar' })
    }
}

const apagar = async(req, res)=>{
    let { nome, cnh, cpf, telefone } = req.body
    let id = req.params.id

    if (!nome || !cnh || !cpf || !telefone) {
        return res.status(400).json({ message: 'insira todos os campos necessarios' })
    }

    try{
        const motorista = await findByPK(id)
        if(!motorista) {
            return res.status(404).json({message: 'motorista não encontrado'})
        }

        await motorista.destroy()

        res.status(200).json({ message: 'motorista apagado com sucesso'})
    }catch(err){
        console.error('erro ao apagar', err)
        res.status(500).json({ message: 'erro ao apagar' })
    }
}

module.exports = {
    cadastrar,
    listar,
    buscarID,
    buscarNome,
    atualizar,
    apagar
}