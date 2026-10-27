const token = localStorage.getItem('token')

// Proteção da rota privada: se não tem token, redireciona para a Home
if (!token) {
    location.href = '../index.html'
}

let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/entregas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(res => {
            if (!res.ok) {
                localStorage.clear()
                alert('Faça login novamente, tempo expirado!')
                location.href = '../index.html'
                throw new Error('Sessão expirada')
            }
            return res.json()
        })
        .then(dados => {
            console.log(dados)
            resposta.innerHTML = ''
            resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dados)}
            </table>
        `
        })
        .catch((err) => {
            console.error('Erro ao listar entregas', err)
            resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
        })
})

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codEntrega}</td>`
        corpo += `<td>${el.cidadeDestino}</td>`
        corpo += `<td>${el.statusAtual}</td>`
        corpo += `<td>${new Date(el.dataHora).toLocaleString('pt-BR')}</td>`
        corpo += `<td>${el.EntregaCarga ? el.EntregaCarga.codCarga : el.idCarga}</td>`
        corpo += `<td>${el.EntregaCarga ? el.EntregaCarga.descricao : '-'}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Cidade Destino</th>
                <th>Status</th>
                <th>Data / Hora</th>
                <th>Cód. Carga</th>
                <th>Descrição Carga</th>
            </tr>
        </thead>
    `
}

