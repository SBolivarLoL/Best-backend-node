const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UsersScheme = new mongoose.Schema(
  {
    name: {
      type: String
    },
    age: {
      type: Number
    },
    email:{
      type:String,
      unique: true
    },
    password:{
      type: String,
      select: false
    },
    role: {
      type: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps:true, //fechas createdAt, updatedAt
    versionKey: false
  }
);

UsersScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UsersScheme)//"connection name", "Schema used"