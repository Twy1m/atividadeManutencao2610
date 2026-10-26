const { json } = require("body-parser")

let res = document.getElementById('res')
let loginBTN = document.getElementById('loginBTN')

loginBTN.addEventListener('click', async (e)=>{
    e.preventDefault()

    try{
        let email = document.getElementById('email').value
        let senha = document.getElementById('senha').value

        const payload = {
            email: email,
            senha: senha
        }

        const resposta = fetch(`http://localhost:3000/login`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { "Content- Type": "application/ json"}
        })

        const dados = await resposta.json()
        res.innerHTML = dados.message

        if(resposta.ok){
            localStorage.setItem("token", dados.token)
            res.innerHTML = "login realizado com sucesso"
        }
    }catch(err){

    }
})