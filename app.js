const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//"mongodb+srv://cluster0.2rfhl.mongodb.net/myFirstDatabase"

mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemsSchema = {
  name: String,
};

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
  name: 'Welcome to your todolist',
});

const item2 = new Item({
  name: 'Hit the + button to aff a new item',
});

const item3 = new Item({
  name: '<--- Hit this to delete an item',
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model('List', listSchema);

app.get('/', function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Successfully saved default items to DB.');
        }
      });
      res.redirect('/');
    } else {
      res.render('list', { listTitle: 'Today', newListItems: foundItems });
    }

    console.log(foundItems);
  });
});

app.get('/:customListName', function (req, res) {
  let customListName = req.params.customListName;

  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        console.log('Doesnt exist');
      } else {
        console.log('Exist');
      }
    }
  });

  const list = new List({
    name: customListName,
    items: defaultItems,
  });

  list.save();
});

app.post('/', function (req, res) {
  let itemName = req.body.newItem;

  let item = new Item({
    name: itemName,
  });

  item.save();

  res.redirect('/');
});

app.post('/delete', function (req, res) {
  let checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (!err) {
      console.log('Successfully deleted');
      res.redirect('/');
    }
  });
});

// app.get('/work', function (req, res) {
//   res.render('list', { listTitle: 'work list', newListItems: workItems });
// });

// app.post('/work', function (req, res) {
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect('/work');
// });

app.get('/about', function (req, res) {
  res.render('about');
});

app.listen(port, function () {
  console.log(`Sever started on port ${port}`);
});
