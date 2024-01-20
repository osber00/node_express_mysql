const express =  require('express')
const bodyParser = require('body-parser')

const sequelize = require('./app/Config/conexion_db')
const UsuarioRoute = require('./app/Routes/UsuarioRoute')
const AuthRoute = require('./app/Routes/AuthRoute')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(UsuarioRoute)
app.use(AuthRoute)

sequelize.authenticate().then(()=>{
    console.log('Conexion a la base de datos')
}).catch((error)=>{
    console.log('Error en la conexion a la base de datos')
})


/* const port = 3001
app.listen(port,()=>{
    console.log('Server funcionando en http://localhost:',port)
}) */

module.exports = app