import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import createToken from "../utils/createToken.js";

export const createUser = async (req, res) => {
  const { name, email, password, phones, isActive } = req.body;
  try {
    if (!name || !email || !password || !phones || !isActive) {
      return res.status(400).json({ mensaje: "Error al crear usuario" });
    }

    const emailRegex = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/gm;
    const emailTest = emailRegex.test(email);

    if (!emailTest) {
      return res.status(400).json({
        mensaje: "Por favor utilizar un correo valido (aaaaaaa@dominio.cl)",
      });
    }

    const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    const passwordTest = passwordRegex.test(password);

    if (!passwordTest) {
      return res.status(400).json({
        mensaje: `La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.Puede tener otros símbolos.`,
      });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(404).json({ mensaje: "El correo ya esta registrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hashed,
      phones,
      isActive,
    };

    const user = await User.create(newUser);

    res.status(201).json({
      id: user._id,
      username: user.name,
      isActive: user.isActive,
      created: user.createdAt,
      modified: user.updatedAt,
      token: createToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await User.findById(id);

    if (!findUser) {
      return res.status(404).json({ mensaje: "El usuario no existe" });
    }

    const setUser = {
      id: findUser._id,
      name: findUser.name,
      phones: findUser.phones,
      isActive: findUser.isActive,
      newToken: createToken(findUser._id),
    };

    res.status(200).json(setUser);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor." });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phones, isActive } = req.body;
  try {
    if (!name || !email || !password || !phones || !isActive) {
      return res.status(400).json({
        mensaje: "Por favor envie todos los datos para actualizar el usuario",
      });
    }

    const findUser = await User.findById(id);

    if (!findUser) {
      return res.status(404).json({ mensaje: "El usuario no existe" });
    }

    const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    const passwordTest = passwordRegex.test(password);

    if (!passwordTest) {
      return res.status(400).json({
        mensaje: `La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.Puede tener otros símbolos.`,
      });
    }

    const newSalt = await bcrypt.genSalt(10);
    const newHashed = await bcrypt.hash(password, newSalt);

    const updateUser = {
      name,
      email,
      password: newHashed,
      phones,
      isActive,
    };

    const user = await User.findByIdAndUpdate(id, updateUser, { new: true });

    res.status(202).json({
      mensaje: "Usuario actualizado con exito",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phones: user.phones,
        isActive: user.isActive,
        lastmodified: User.updatedAt,
        newToken: createToken(user.__id),
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await User.findById(id);

    if (!findUser) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ mensaje: "Usuario eliminado con exito" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
