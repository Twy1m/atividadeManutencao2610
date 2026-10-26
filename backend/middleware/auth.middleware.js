const cryptoJs = require('crypto-js')

const authMiddleware = async (req, res, next)=>{
    const token = req.headers["authorization"]

    if(!token){
        return res.status(400).json({message: 'usuario não autenticado'})
    }

    try{
        const bytes = cryptoJs.AES.decrypt(token, "senha").toString(cryptoJs.enc.Utf8)

        if(!bytes){
            return res.status(401).json({message: 'token invalido'})
        }

        const tokenDesc = JSON.parse(bytes)

        if(!tokenDesc){
            return res.status(401).json({ message: 'usuario não autenticado'})
        }
        if(tokenDesc.expiraEm < Date.now()){
            return res.status(401).json({message: 'token expirado'})
        }

        next()
    }catch(err){
        console.error('erro', err)
        res.status(500).json({message: 'erro ao autenticar'})
    }
}

module.exports = authMiddleware