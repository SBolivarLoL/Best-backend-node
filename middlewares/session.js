const users = require("../models/nosql/users");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");

const authMiddleware = async (req, res, next) => {
  try {
    if(!req.headers.authorization) {
      handleHttpError(res, "No tienes token", 401);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken._id) {
      handleHttpError(res, "Token no válido", 401);
      return;
    }
    const user = await users.findById(dataToken._id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    handleHttpError(res, "error, no sesion", 401);
  }
};

module.exports = authMiddleware;