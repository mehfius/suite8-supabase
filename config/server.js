var express     = require("express");
var consign     = require("consign");
var cors        = require('cors');
var bodyParser  = require('body-parser')
//var fetch       = require('node-fetch');

var app = express();

    app.set("view engine", "ejs");
    app.set("views", "./app/views");
    app.use(cors());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}));
    //app.use(fetch());

consign()
  .include("app/routes")
  .then("config/supa.js")
  .then("config/log.js")
  .then("config/mvb.js")
  .then("app/models")
  .into(app);

module.exports = app;