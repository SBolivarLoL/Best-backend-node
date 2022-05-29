require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbconnection = require('./config/mongo');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const PORT = process.env.PORT || 3006;

//routes use
//localhost:port/api/v1/***
app.use("/api/v1", require("./routes"))

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

dbconnection();