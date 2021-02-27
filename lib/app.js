const express = require("express");
const app = express();

app.use(express.json());

app.use("/graphql", require("./schemas/graphql"));

module.exports = app;
