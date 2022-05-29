const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const StorageScheme = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    }
  },
  {
    timestamps: true, //fechas createdAt, updatedAt
    versionKey: false,
  }
);

StorageScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("storages", StorageScheme); //"connection name", "Scheme used"
