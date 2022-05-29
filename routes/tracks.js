const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/session");
const {validatorCreateItem, validatorGetItem } = require("../validators/tracks");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");

/**
 * CRUD de tracks
 */
//get listado de tracks
router.get("/", authMiddleware, getItems);

//get detalle de un track
router.get("/:id", validatorGetItem, getItem);

//create un track
router.post("/", validatorCreateItem, createItem);

//update un track
router.put("/:id", validatorGetItem, validatorCreateItem, updateItem);//como es casi igual que el getItem, validamos el id igual
//y como el update es casi igual al create, validamos el body igual

//delete un track
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router