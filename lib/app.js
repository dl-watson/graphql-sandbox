const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/graphql", require("./schemas/graphql"));

module.exports = app;
