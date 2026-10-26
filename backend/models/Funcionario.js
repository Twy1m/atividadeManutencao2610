const conn = require('../db/conn')
const { DataTypes, DATE } = require('sequelize')

const Funcionario = conn.define('funcionario', {
    codFuncionario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'funcionarios'
})

module.exports = Funcionario