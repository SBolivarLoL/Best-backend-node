require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body");
const dbconnectionNoSQL = require('./config/mongo');
const loggerStream = require("./utils/handleLogger");
const { mysqlDbConnection } = require("./config/mysql");
const app = express();

const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400 //evitar el envio del mensage para slack si el status code no es un error
  }
});

const PORT = process.env.PORT || 3006;

//routes use
//localhost:port/api/v1/***
app.use("/api/v1", require("./routes"))

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

ENGINE_DB === "nosql" ? dbconnectionNoSQL() : mysqlDbConnection();