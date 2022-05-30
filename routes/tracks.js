const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/session");
const {validatorCreateItem, validatorGetItem } = require("../validators/tracks");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const checkRole = require("../middlewares/role");

/**
 * CRUD de tracks
 */
//get listado de tracks
router.get("/", authMiddleware, getItems);

//get detalle de un track
router.get("/:id", authMiddleware, validatorGetItem, getItem);

//create un track
router.post("/", authMiddleware, checkRole(["user", "admin"]), validatorCreateItem, createItem);

//update un track
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem);//como es casi igual que el getItem, validamos el id igual
//y como el update es casi igual al create, validamos el body igual

//delete un track
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router