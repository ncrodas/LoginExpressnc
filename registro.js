const connection = require("./conexion");
const bcrypt = require('bcrypt');
const saltRounds = 10;

 const registro = async (req, res) => {//req = request,peticion; res = responde, respuesta
    if (!req.session.usuario){
      res.status(401).send('No autorizado')
      return
    }
    const datos = req.query;
  
    // A simple SELECT query
  try {
  
    console.hash = bcrypt.hashSync(datos.clave, saltRounds);

    const [results, fields] = await connection.query(
      "INSERT INTO `usuarios` (`id`, `usuario`, `clave`) VALUES (NULL, ?, ?);",
      [datos.usuario, hash]//datos clave
    );
    if(results.affectedRows> 0){
        req.session.usuario = datos.usuario;
        res.status(200).send(" Registro correcto :) ")
    } else{
        res.status(401).send("No se puedo registrar usuario :(")
    }
    
    console.log(results); //results contains rows returned by server
    console.log(fields); // fields contains extra
  } catch (err) {
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
  }
 module.exports = registro;