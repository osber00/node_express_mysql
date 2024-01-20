const express = require('express')

const UsuarioController = require('../Controllers/UsuarioController')
const middlware = require('../Middlewares/tokenApiMiddleware')

const router = express.Router()

//router.use(middlware.authToken)

router.get('/usuarios', UsuarioController.getUsuarios)
router.get('/usuarios/:id', UsuarioController.getUsuarioId)
router.get('/usuario-identificacion/:identificacion', UsuarioController.getUsuarioxIdentificacion)
router.put('/usuarios/:usuario_id', UsuarioController.updateUsuario)
router.post('/usuarios', UsuarioController.createUsuario)
router.delete('/usuarios/:usuario_id', UsuarioController.deleteUsuario)

module.exports = router