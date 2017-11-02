$(function() {
  $("#alive").on("click", ".devour", function() {
    event.preventDefault();
    var route = "/api/burgers/";
    route += $(this).data("id");
    route += "?_method=PUT"
    $.post(route, function(response) {
      if(response) {
        console.log(response);
        location.reload();
      }
    })
  });

  $("#newburger").on("click", function() {
    event.preventDefault();
    if($("#name").val().trim()) {
      var newBurger = {
        name: $("#name").val().trim()
      }
      console.log({newBurger});
      $.post("/api/burgers", newBurger, function(request, response) {
        console.log(request);
        if(response) {
          console.log(response);
          location.reload();
        }
      })
    } else {
      $("#message").text("You can't add a burger without a name!");
    }
  });
});