const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const router = express.Router();


// const SECRET_KEY = "mi_secreto"; // Cambiar por una clave segura

// Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Usuario creado" });
  } catch (error) {
    res.status(400).json({ error: "El usuario ya existe" });
  }
});



// Inicio de sesión
router.post("/login", async (req, res) => {
  console.log("EOEOE | Solicitud de inicio de sesión recibida");
  
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    //incluye en la respuesta el token y _id del usuario
    res.json({ token,_id: user._id});
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});


// router.get('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params; // Extraer el ID de los parámetros de la URL
//     const user = await User.findById(id); // Buscar el usuario en la base de datos por su ID

//     if (!user) {
//       return res.status(404).json({ error: 'Usuario no encontrado' }); // Manejo si no se encuentra el usuario
//     }

//     res.json(user); // Enviar el usuario encontrado en la respuesta
//   } catch (error) {
//     console.error(error); // Imprimir cualquier error en la consola
//     res.status(500).json({ error: 'Error en el servidor' }); // Manejo de errores del servidor
//   }
// });


router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extraer el ID de los parámetros de la URL
    const user = await User.findById(id); // Buscar el usuario en la base de datos por su ID

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user); // Enviar el usuario encontrado en la respuesta
  } catch (error) {
    console.error(error); // Imprimir cualquier error en la consola
    res.status(500).json({ error: 'Error en el servidor' });
  }
});





module.exports = router;
