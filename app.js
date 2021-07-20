const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

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

res.render("list", { kindOfDay: day });

});

app.post("/", function(req, res){
  var item = req.body.newItem;
  console.log(item);
})


app.listen(port, function () {
  console.log(`Sever started on port ${port}`);
});
