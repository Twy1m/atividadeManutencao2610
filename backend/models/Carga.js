const conn = require('../db/conn')
const { DataTypes } = require('sequelize')

const Carga = conn.define('carga', {
    codCarga: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    peso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    volume: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    codRastreio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idMotorista: {
        type: DataTypes.INTEGER,
        references: {
            model: 'motoristas',
            key: 'codMotorista'
        }
    }
}, {
    timestamps: false,
    tableName: 'cargas'
})

module.exports = Carga