var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  getItemID();
});

function getItemID() {
  inquirer.prompt({
    name: "item",
    type: "input",
    message: "What is the product ID of the product you want to purchase?",
  }).then(function(answer) {
    getStockNum(answer.item);
  });
};

function getStockNum(itemID) {
  inquirer.prompt({
    name: "stock",
    type: "input",
    message: "How many would you like to purchase?"
  }).then(function(answer) {
    stockLookup(itemID, answer.stock);
  });
};

function stockLookup(itemID, stockNum) {
  var query = "SELECT stock_quantity FROM products WHERE item_id = " + itemID;
  connection.query(query, function(err, res) {
    if (stockNum > res[0].stock_quantity) {
      console.log("You asked for too many!");
    } else {
      console.log("OK!");
    }
  });
}