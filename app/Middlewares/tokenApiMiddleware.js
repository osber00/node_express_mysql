const moment = require('moment')
const jwt = require('jwt-simple')


exports.authToken = (req, res, next) => {

    //Comprobar si existe un token-usuario
    if (!req.headers['token-usuario']) {
        return res.json({mje: 'No se encontró un token-usuario en la petición'})
    }

    //Obtener info del token-usuario
    const token = req.headers['token-usuario']
    let payload = {}

    try {
        payload = jwt.decode(token,'ebercon-developers')
    } catch (error) {
        return res.json({mje: 'Ocurrió un error al obtener el token-usuario'})
    }

    if (payload.created_at < moment.unix()) {
        return res.json({mje: 'token-usuario vencido'})
    }

    req.usuario_id = payload.usuario_id


    next()
}