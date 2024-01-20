const Usuario = require('../Models/Usuario')

const campos = ['id','name','lastname','tipo','identificacion','email','telefono','created_at']

exports.getUsuarios = async(req, res) => {
    const peticion = await Usuario.findAll({attributes:campos})
    console.log('USUARIO AUTH: ', req.usuario_id)
    res.json(peticion)
}

exports.getUsuarioId = async(req, res) => {
    const id = req.params.id
    const peticion = await Usuario.findByPk(id,{attributes:campos})
    res.json(peticion)
}

exports.getUsuarioxIdentificacion = async (req, res) => {
    const identificacion = req.params.identificacion
    const peticion = await Usuario.findOne(
        {
            where: {
                identificacion: identificacion
            },
            attributes: campos
        }
    )
    res.json(peticion)
}

exports.createUsuario = async (req, res) => {
    try {
        //res.json(req.body)
        const peticion = await Usuario.create(req.body)
        res.json(peticion)
    } catch (error) {
        console.log(error)
    }

}

exports.updateUsuario = async(req, res) => {
    const usuario_id = req.params.usuario_id
    console.log(req.body.email)
    const peticion = await Usuario.update(
        req.body,
        {
            where: {
                id: usuario_id
            }
        }
    )

    res.json(peticion)
}

exports.deleteUsuario = async (req, res) =>{
    const usuario_id = req.params.usuario_id

    try {
        const peticion = await Usuario.destroy({
            where:{
                id: usuario_id
            }
        })

        res.json({mje:'Se ha borrado el usuario ', peticion})
    } catch (error) {
        console.log(error)
    }
}
