var express = require("express");
var consign = require("consign");
var cors = require('cors');

var app = express();

app.set("view engine", "ejs");
app.set("views", "./app/views");
      app.use(cors());
/*       app.use(express.urlencoded({extended: true}))
      app.use(express.json()) */
consign()
  .include("app/routes")
  .then("config/supa.js")
  .then("app/models")
  .into(app);

module.exports = app;