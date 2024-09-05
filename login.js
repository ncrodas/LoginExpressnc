const connection = require("./conexion");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const login = async (req, res) => {//req = request,peticion; res = responde, respuesta
    const datos = req.query;
    // A simple SELECT query
try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `usuario` = ? ",
      [datos.usuario]//datos clave
    );
    console.log(bcrypt.hashSync(datos.clave, saltRounds));
    if(results.length > 0 && bcrypt.compareSync(datos.clave, results[0].clave)){
        req.session.usuario = datos.usuario;
        res.status(200).send("Inicio de sesión correcto :) ")
    } else{
        res.status(401).send("Datos incorrectos")
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).send('Error en el servidor')
     }

  }

  module.exports = login;