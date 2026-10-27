const Entrega = require('../models/Entrega')
const Carga = require('../models/Carga')

const cadastrar = async (req, res) => {
    let { cidadeDestino, statusAtual, dataHora, idCarga, codRastreio } = req.body

    if (!cidadeDestino || !statusAtual || !dataHora || !idCarga) {
        return res.status(400).json({ message: 'insira todos os campos necessarios' })
    }

    try {

        let carga = await Carga.findByPk(idCarga)
        if (!carga) {
            return res.status(404).json({ message: "Carga não encontrado" })
        }

        await Entrega.create({
            cidadeDestino,
            statusAtual,
            dataHora: new Date(dataHora),
            idCarga
        })

        res.status(201).json({ message: 'Entrega cadastrado com sucesso' })
    } catch (err) {
        console.error('erro ao cadastrar', err)
        res.status(500).json({ message: 'erro ao cadastrar' })
    }
}

const listar = async (req, res) => {
    try {
        const entrega = await Entrega.findAll({
            include: [
                {
                    model: Carga,
                    as: 'EntregaCarga',
                    attributes: ['codCarga', 'descricao']
                }
            ],
            order: [
                ['dataHora', 'ASC']
            ]
        })
        return res.status(200).json(entrega)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao listar entregas!' })
    }
}

module.exports = { cadastrar, listar }