const jwt = require('jsonwebtoken');
const getProperties = require("../utils/handleEngineProperties");
const JWT_SECRET = process.env.JWT_SECRET;
const propertiesKey = getProperties();

/**
 * Se debe pasar el objeto del usuario
 * @param {*} user
 */
const tokenSign = async (user) => {
  const sign = await jwt.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
  return sign;
};

/**
 * Se debe pasar el token de sesión (JWT)
 * @param {*} tokenJWT
 */
const verifyToken = async (tokenJWT) => {
  try {
    return jwt.verify(tokenJWT, JWT_SECRET);
  } catch (error) {
    console.log(error);
    return null;
  }
};



module.exports = {tokenSign, verifyToken};