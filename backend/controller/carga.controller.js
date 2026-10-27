const Carga = require('../models/Carga')
const Motorista = require('../models/Motorista')

const cadastrar = async (req, res) => {
    let { descricao, peso, volume, idMotorista, codRastreio } = req.body

    if (!descricao || !peso || !volume || !codRastreio || !idMotorista) {
        return res.status(400).json({ message: 'insira todos os campos necessarios' })
    }

    try {

        let motorista = await Motorista.findByPk(idMotorista)
        if(!motorista){
            return res.status(404).json({ message: "motorista não encontrado"})
        }

        Carga.create({
            descricao,
            peso,
            volume,
            idMotorista,
            codRastreio
        })

        res.status(201).json({ message: 'Carga cadastrado com sucesso' })
    } catch (err) {
        console.error('erro ao cadastrar', err)
        res.status(500).json({ message: 'erro ao cadastrar' })
    }
}

module.exports = { cadastrar }