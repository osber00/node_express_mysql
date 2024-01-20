const bcrypt = require('bcryptjs')
const {validationResult}  = require('express-validator')
const {Op} = require('sequelize')
const moment = require('moment')
const jwt = require('jwt-simple')

const Usuario = require('../Models/Usuario')

exports.registro = async (req, res) => {

    //Se obtiene desde la ruta en AuthRoute
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
        return res.status(422).json({ mjes: errores.array() })
    }

    const existe =  await Usuario.findOne(
        {
            where: {
                [Op.or] : [
                    {email: req.body.email},
                    {identificacion: req.body.identificacion},
                    {telefono: req.body.telefono}
                ]
            }
        }
    )

    //res.json(existe)

    if (existe != null) {
        res.json({mje: 'No se pueden duplicar los datos de (correo, telefono e identificacion)'})
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10)
    try {
        const peticion = await Usuario.create(req.body)
        res.json(peticion)
    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res) => {
    const usuario = await Usuario.findOne(
        {
            where:{
                email: req.body.email
            }
        }
    )

    if (usuario) {
        const authPassword = bcrypt.compareSync(req.body.password, usuario.password)
        if (authPassword) {
            res.json({token: crearToken(usuario)})
        } else {
            res.json({mje: "Usuario y/o contraseña no válidos"})
        }
    } else {
        res.json({mje: "Revisa tus datos no estás autorizado"})
    }
}

const crearToken = (usuario)=>{
    const payload = {
        usuario_id : usuario.id,
        created_at : moment().unix(),
        expired_at : moment().add(5,'minutes').unix()
    }

    return jwt.encode(payload, 'ebercon-developers')
}