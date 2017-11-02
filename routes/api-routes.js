var express = require("express");
var db = require("../models");

var router = express.Router();

router.get("favicon.ico", function(request, response) {
  response.status(204);
});

router.get("/", function(request, response) {
  console.log("got a request on route /")
  db.Burger.all().then(function(data) {
    // console.log(data);
    var burgers = [];
    for (var instance in data) {
      burgers.push(data[instance].dataValues);
    }

    var renderBurgers = {
      burgers: burgers
    }

    // console.log(burgers);
    // response.json({ data: data, burgers: burgers});//only for testing with postman
    response.render("index", renderBurgers);
  })
});

router.post("/api/burgers", function(request, response) {
  db.Burger.create({
    name: request.body.name
  }).then(function(burger) {
    response.json(burger);
  })
});

router.put("/api/burgers/:id", function (request, response) {
  db.Burger.update({
    devoured: true,
  },
  {
    where: {
      id: request.params.id
    }
  }).then(function(result) {
    if(!result[0]) {
      console.log(result);
      response.status(404).end();
    }
    else {
      console.log(result);
      response.send(true);
      response.status(200).end();
    }
  })
})

router.get("*", function(request, response) {
  console.log("got a request on route *")
  db.Burger.all().then(function(data) {

    var burgers = [];
    for (var instance in data) {
      burgers.push(data[instance].dataValues);
    }

    var renderBurgers = {
      burgers: burgers
    }
    // response.json(burgers);//only for testing with postman
    response.render("index", renderBurgers);
  })
});
module.exports = router;