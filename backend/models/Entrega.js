const conn = require('../db/conn')
const { DataTypes, DATE } = require('sequelize')

const Entrega = conn.define('entrega', {
    codEntrega: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cidadeDestino: {
        type: DataTypes.STRING,
        allowNull: false
    },
    statusAtual: {
        type: DataTypes.ENUM("ENTREGUE", "TRANSITO"),
        allowNull: false
    },
    dataHora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    idCarga: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cargas',
            key: 'codCarga'
        }
    }
}, {
    timestamps: false,
    tableName: 'entregas'
})

module.exports = Entrega