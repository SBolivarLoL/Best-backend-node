const { handleHttpError } = require("../utils/handleError");

/**
 * If the user has the role of "admin" or "user" then allow them to continue, otherwise throw an error.
 * @param role - is an array of roles that the user can have.
 * @returns The function checkRole is being returned.
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
