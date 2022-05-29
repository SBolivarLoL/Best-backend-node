const { handleHttpError } = require("../utils/handleError");

/**
 * array con los roles permitidos
 * @param {*} role
 * @returns
 */
const checkRole = (role) => (req, res, next) => {
  try {
    const { user } = req;
    console.log({ user });
    const rolesOfUser = user.role; //por defecto tiene el rol de "user"
    const checkValidRole = role.some((roleSingle) =>
      rolesOfUser.includes(roleSingle)
    );
    if (!checkValidRole) {
      handleHttpError(res, "No tienes permiso", 403);
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    handleHttpError(res, "No tienes permisos", 403);
  }
};

module.exports = checkRole;
