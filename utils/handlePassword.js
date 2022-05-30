const bcryptjs = require("bcryptjs");

/**
 * It takes a password, generates a salt, and then hashes the password with the salt.
 * @param passwordText - The password to be encrypted.
 * @returns The hash of the password.
 */
const encrypt = async (passwordText) => {
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(passwordText, salt);
  return hash;
};

/**
 * Pasamos contraseña sin encriptar y la contraseña encriptada para comparar.
 * @param {*} passwordText
 * @param {*} hash
 */
const compare = async (passwordText, hash) => {
  const result = await bcryptjs.compare(passwordText, hash);
  return result;
};

module.exports = { encrypt, compare };
