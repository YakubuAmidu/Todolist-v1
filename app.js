const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

var item = "";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
    var day = today.toLocaleDateString("en-US", options);

res.render("list", { kindOfDay: day, newItem: item });

});

app.post("/", function(req, res){
  item = req.body.newItem;
 res.redirect("/");
})


app.listen(port, function () {
  console.log(`Sever started on port ${port}`);
});
