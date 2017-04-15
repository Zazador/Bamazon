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
	homePage();
});

function homePage() {
	inquirer.prompt({
		name: "choice",
		type: "list",
		message: "What would you like to do?",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}).then(function(answer) {
		switch (answer.choice) {
			case "View Products for Sale":
			viewProducts();
			break;

			case "View Low Inventory":
			lowInventory();
			break;

			case "Add to Inventory":
			addInventory();
			break;

			case "Add New Product":
			addProduct();
			break;
		}
	});
};

function viewProducts() {
	var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
	connection.query(query, function(err, res) {
		for (var i = 0; i < res.length; i++) {
			console.log("Item ID: " + res[i].item_id + " || Name: " + res[i].product_name + " || Price: " 
				+ res[i].price + " || Quantity: " + res[i].stock_quantity);
		}
	});
	connection.end();
}

function lowInventory() {
	var query = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5";
	connection.query(query, function(err, res) {
		for (var i = 0; i < res.length; i++) {
			console.log("Item ID: " + res[i].item_id + " || Name: " + res[i].product_name + " || Quantity: " + res[i].stock_quantity);
		}
	});
	connection.end();
}
