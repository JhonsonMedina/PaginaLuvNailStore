const User = require('../models/use.models');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../servicew/generar-jwt');

//gestionar la creacion de un usuario

const crearUser = async (req, res) => {
  const { name, lastName, direction, email, password } = req.body;

  if (!name || !lastName || !email || !password) {
    return res.status(404).json({
      msg: 'todos los campos son requeridos',
      status: 404,
    });
  }
  try {
    const salt = bcrypt.genSaltSync();
    bcrypt.hashSync(password, salt);

    await User.create({
      name: name,
      lastName: lastName,
      direction: direction,
      email: email,
      password: bcrypt.hashSync(password, salt),
    });

    res.status(201).json({
      msg: 'Usuario creado correctamente',
      status: 201,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al crear el usuario',
      status: 500,
    });
  }
};

//gestionar el login de un usuario

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.status(404).json({
      msg: 'Todos los campos son requeridos',
      status: 404,
    });
  }

  try {
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.status(404).json({
        msg: `Usuario con email ${email} no encontrado`,
        status: 404,
      });
    }

    if (findUser.status !== 'active') {
      return res.status(404).json({
        msg: `Usuario con email ${email} no está activo en el sistema`,
        status: 404,
      });
    }

    //verificar contraseña

    const passVerify = bcrypt.compareSync(password, findUser.password);

    if (!passVerify) {
      return res.status(404).json({
        msg: `Contraseña incorrecta`,
        status: 404,
      });
    }

    const token = await generarJWT(findUser._id);

    res.status(200).json({
      msg: `Usuario con email ${email} logueado correctamente`,
      status: 200,
      data: {
        name: findUser.name,
        lastName: findUser.lastName,
        email: findUser.email,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al loguear el usuario',
      status: 500,
    });
  }
};

const getUserById = async (req, res) => {
  const { iduser } = req.params;

  if (!iduser) {
    return res.status(404).json({
      msg: 'Id de usuario es requerido',
      status: 404,
    });
  }

  if (iduser.length !== 24) {
    return res.status(404).json({
      msg: 'Id de usuario no válido',
      status: 404,
    });
  }

  try {
    const user = await User.findOne({ _id: iduser });

    if (!user) {
      return res.status(404).json({
        msg: 'Usuario no encontrado',
        status: 404,
      });
    }

    res.status(200).json({
      msg: 'Usuario encontrado exitosamente',
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al buscar el usuario',
      status: 500,
    });
  }
};

// actualizacion de status

const updateStatusUserById = async (req, res) => {
  const { iduser } = req.params;

  if (!iduser) {
    return res.status(404).json({
      msg: 'Id de usuario de es requerido',
      status: 404,
    });
  }

  if (iduser.length !== 24) {
    return res.status(404).json({
      msg: 'Id de usuario vo Valido',
      status: 404,
    });
  }

  try {
    const changes = { status: 'Inactive' };

    const user = await User.findByIdAndUpdate(iduser, changes);

    if (!iduser) {
      return res.status(404).json({
        msg: 'Usuario no encontrado',
        status: 404,
      });
    }

    res.status(200).json({
      msg: 'Usuario actualizado exitosamente',
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al buscar el usuario',
      status: 500,
    });
  }
};

//actualizacion de datos
// recibir los nuevos datos

const updateUserById = async (req, res) => {
  const { iduser } = req.params;
  const { name, lastName, email } = req.body;

  if (!iduser) {
    return res.status(404).json({
      msg: 'Id de usuario de es requerido',
      status: 404,
    });
  }

  if (iduser.length !== 24) {
    return res.status(404).json({
      msg: 'Id de usuario vo Valido',
      status: 404,
    });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: iduser },
      {
        name: name,
        lastName: lastName,
        email: email,
      },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({
        msg: 'El usuario no fue encontrado',
        status: 404,
      });
    }

    res.status(200).json({
      msg: 'Usuario actualizado correctamente',
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al actualizar el usuario',
      status: 500,
    });
  }
};

module.exports = {
  crearUser,
  getUserById,
  loginUser,
  updateStatusUserById,
  updateUserById,
};
