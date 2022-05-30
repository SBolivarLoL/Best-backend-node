const mongoose = require("mongoose");

/**
 * It connects to a MongoDB database using the Mongoose library.
 */
const dbconnectionNoSQL = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
      if (!err) {
        console.log("---CONEXION ACTIVA---");
      } else {
        console.log("---ERROR DE CONEXION---");
      }
    }
  );
};

module.exports = dbconnectionNoSQL;
