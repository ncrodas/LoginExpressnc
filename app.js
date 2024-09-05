const express = require('express')
const app = express()
const port = process.env.PORT || 3000
// Get the client
const mysql = require('mysql2/promise');
const cors = require('cors')
var session = require('express-session')
var md5 = require('md5');
const login = require('./login');
const registro = require('./registro');
const { obtenerUsuarios, eliminarUsuario } = require('./usuarios');
const validar = require('./validar');
const saltRounds = 10;


//variables de entorno
app.use(cors({
  origin: process.env.URLFRONTEND || 'http://localhost:5173',
  credentials: true
}))
app.use(session({
  secret: process.env.SECRETSESSION || 'youarethebestinmylive12345',
  proxy: process.env.NODE_ENV === 'production',
  cookie:{
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none'
  }
}))


app.get('/',(req, res) => {
  res.send('hello world')
})
app.get('/login',login)

  app.get('/validar', validar )
  
app.get('/registro',registro)

app.get('/usuarios',obtenerUsuarios)

app.delete('/usuarios',eliminarUsuario)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
