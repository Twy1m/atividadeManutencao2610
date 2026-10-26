const Sequelize = require('sequelize')

const conn = new Sequelize('db_logistica', 'root', 'senai',{
    hostname: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = conn