const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const {usersModel} = require("../models");

/**
 * Controlador de registro de usuarios
 * @param {*} req
 * @param {*} res
 */
const registerCtrl = async (req, res) => {
  try {
      req = matchedData(req);
      const passwordHash = await encrypt(req.password);
      const body = { ...req, password: passwordHash };
      const dataUser = await usersModel.create(body);
      dataUser.set("password", undefined, { strict: false });
      const data = {
        token: await tokenSign(dataUser),
        user: dataUser,
      };
      res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error al crear el usuario");
  }
};

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel.findOne({ email: req.email });
    if (!user) {
      handleHttpError(res, "El usuario no existe", 404);
      return;
    }
    const passwordHash = user.get("password");
    const checkPassword = await compare(req.password, passwordHash);
    if (!checkPassword) {
      handleHttpError(res, "El password es incorrecto", 401);
      return;
    }
    user.set("password", undefined, { strict: false });//para que no se muestre la contraseña en el json
    const data = {
      token: await tokenSign(user),
      user
    }
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "Error al iniciar sesión");
  }
};

module.exports = { registerCtrl, loginCtrl };
