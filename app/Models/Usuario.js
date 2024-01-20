const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../Config/conexion_db')

const UsuarioSchema = {
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
    },
    lastname:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        unique: true
    },
    identificacion:{
        type: DataTypes.INTEGER,
        unique: true
    },
    telefono:{
        type: DataTypes.STRING,
        unique: true
    },
    tipo: {
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING,
    },
}

const configSchema = {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
}

const Usuario = sequelize.define('users', UsuarioSchema, configSchema)

module.exports = Usuario