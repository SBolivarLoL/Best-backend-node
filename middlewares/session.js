const { usersModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const getProperties = require("../utils/handleEngineProperties");
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
  try {
    if(!req.headers.authorization) {
      handleHttpError(res, "No tienes token", 401);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if(!dataToken) {
      handleHttpError(res, "No Payload Data", 401);
      return;
    }

    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id]
    }

    const user = await usersModel.findOne(query);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    handleHttpError(res, "error, no sesion", 401);
  }
};

module.exports = authMiddleware;