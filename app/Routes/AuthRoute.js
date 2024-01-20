const router = require('express').Router()
const AuthController = require('../Controllers/AuthController')
const {check} = require('express-validator')


const validaciones = [
    check('name','Algo salió mal con el campo nombre').not().isEmpty(),
    check('lastname','Algo salió mal con el campo apellidos').not().isEmpty(),
    check('email','Algo salió mal con el campo nombre').isEmail(),
    check('identificacion','Algo salió mal con el campo identificacion').not().isEmpty(),
    check('password','Algo salió mal con el campo password').not().isEmpty(),
]

router.post('/registro', validaciones, AuthController.registro)
router.post('/login', AuthController.login)

module.exports = router