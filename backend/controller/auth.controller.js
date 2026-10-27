const cryptoJs = require("crypto-js")
const Funcionario = require('../models/Funcionario')

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const funcionario = await Funcionario.findOne({ where: { email: email } })

        if (!email || senha !== cryptoJs.AES.decrypt(funcionario.senha, "senha").toString(cryptoJs.enc.Utf8)) {
            return res.status(401).json({ message: "credenciais inválidas" })
        }

        const duasHorasMs = 3 * 60 * 60 * 1000
        const tempoExpiracao = Date.now() + duasHorasMs

        const token = cryptoJs.AES.encrypt(
            JSON.stringify({
                idFuncionario: funcionario.idFuncionario,
                expiraEm: tempoExpiracao
            }),
            "senha"
        ).toString()

        res.status(200).json({ token: token })
    } catch (error) {
        res.status(401).json({ message: "erro ao fazer login", error })
        console.error(error)
    }
}

module.exports = { login }