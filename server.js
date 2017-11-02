var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 5006;

var app = express();

//provides everything inside /public to the client i.e. css, js, other static assets
app.use(express.static("./public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//allows us to catch put methods from form requests with modified tags
app.use(methodOverride('_method'));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./routes/api-routes.js");
app.use("/", routes);

var db = require("./models");

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("listening on port: " + PORT);
  });
});
