const bcryptjs = require("bcryptjs");

/**
 * Contraseña sin encriptar
 * @param {*} passwordText
 */
const encrypt = async (passwordText) => {
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(passwordText, salt);
  return hash;
};

/**
 * Pasamos contraseña sin encriptar y la contraseña encriptada
 * @param {*} passwordText
 * @param {*} hash
 */
const compare = async (passwordText, hash) => {
  const result = await bcryptjs.compare(passwordText, hash);
  return result;
};

module.exports = { encrypt, compare };