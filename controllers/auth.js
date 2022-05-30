const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const { usersModel } = require("../models");

/**
 * It takes the request body, encrypts the password, and then creates a new user in the database.
 * @param req - is the request object
 * @param res - is the response object
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

/**
 * It takes the email and password from the request body, checks if the user exists, if it does, it
 * checks if the password is correct, if it is, it creates a token and sends it back to the client.
 * </code>
 * @param req - The request object.
 * @param res - The response object.
 * @returns The token and the user.
 */
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
    user.set("password", undefined, { strict: false }); //para que no se muestre la contraseña en el json
    const data = {
      token: await tokenSign(user),
      user,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "Error al iniciar sesión");
  }
};

module.exports = { registerCtrl, loginCtrl };
