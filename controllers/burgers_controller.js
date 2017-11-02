var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();

router.post("/api/burgers", function(request, response) {
  var name = [request.body.name];
  console.log(request.body);
  burger.insertOne(name, function(result) {
    response.json(result);//only for testing
  });
})

router.get("/api/burgers", function(request, response) {
  burger.selectAll(function(data) {
    response.json(data);//only for testing
  })
})

router.put("/api/burgers/:id", function(request, response) {
  burger.updateOne(request.params.id, function(result) {
    if(!result.affectedRows) {
      console.log(result);
      response.status(404).end();
    }
    else {
      console.log(result);
      response.json(result);
      response.status(200).end();
    }
  })
})

router.get('/favicon.ico', function(req, res) {
  res.status(204);
});

router.get("/", function(request, response) {
  burger.selectAll(function(data) {
    var renderBurgers = {
      burgers: data
    }
    // console.log(renderBurgers.burgers);
    // response.json(renderBurgers.burgers);//only for testing
    response.render("index", renderBurgers);
  })
})

router.get("*", function(request, response) {
  burger.selectAll(function(data) {
    var renderBurgers = {
      burgers: data
    }
    // console.log(renderBurgers.burgers);
    response.json(renderBurgers.burgers);//only for testing
    response.render("index", renderBurgers);
  })
})

module.exports = router;