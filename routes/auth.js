const express = require("express");
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const router = express.Router();
const {
  validatorRegisterUser,
  validatorLoginUser,
} = require("../validators/auth");

/**
 * Crear un nuevo usuario
 */
router.post("/register", validatorRegisterUser, registerCtrl);

/**
 * Iniciar sesión
 */
router.post("/login", validatorLoginUser, loginCtrl);

module.exports = router;
