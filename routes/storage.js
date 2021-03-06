const express = require("express");
const multer = require("multer");
const {
  createItem,
  getItems,
  getItem,
  deleteItem,
} = require("../controllers/storage");
const router = express.Router();
const { validatorGetItem } = require("../validators/storage");

/**
 * This part of the code should be in a separate file
 * but for some reason it is not working there
 */
/* Creating a storage object that will be used by multer to store the file in the server. */
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const pathStorage = `${__dirname}/../storage`;
    callback(null, pathStorage);
  },
  filename: function (req, file, callback) {
    const extension = file.originalname.split(".").pop();
    const filename = `file-${Date.now()}.${extension}`;
    callback(null, filename);
  },
});

/* Creating a middleware that will be used by the route `router.post("/",
uploadMiddleware.single("myfile"), createItem);` to upload the file. */
const uploadMiddleware = multer({ storage });
/**
 *
 */

//get the list of the DB
router.get("/", getItems);

//get a detail of the DB
router.get("/:id", validatorGetItem, getItem);

//delete a record
router.delete("/:id", validatorGetItem, deleteItem);

//usamos single para solo manejar un archivo
router.post("/", uploadMiddleware.single("myfile"), createItem);

module.exports = router;
