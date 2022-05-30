const jwt = require("jsonwebtoken");
const getProperties = require("../utils/handleEngineProperties");
const JWT_SECRET = process.env.JWT_SECRET;
const propertiesKey = getProperties();

/**
 * It takes a user object and returns a signed JWT token.
 * @param user - The user object that you want to sign.
 * @returns The tokenSign function returns a promise.
 */
const tokenSign = async (user) => {
  const sign = await jwt.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
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

module.exports = { tokenSign, verifyToken };
