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

function addInventory() {
	var itemID, newStock;
	inquirer.prompt({
		name: "itemID",
		type: "input",
		message: "What is the product ID?"
	}).then(function(answer) {
		itemID = answer.itemID;
		inquirer.prompt({
			name: "orderNum",
			type: "input",
			message: "How many units would you like to add?"
		}).then(function(answer) {
			newStock = answer.orderNum;
			var query = "UPDATE products SET stock_quantity = stock_quantity + " + newStock
			+ " WHERE item_id = " + itemID;
			connection.query(query, function(err, res) {
				console.log("Thank you. " + newStock + " units have been added to product ID " + itemID);
			});
			connection.end();
		});
	});
}

function addProduct() {
	var itemID, name, department, price, stock;
	inquirer.prompt({
		name: "itemID",
		type: "input",
		message: "What is the product ID?"
	}).then(function(answer) {
		itemID = answer.itemID;
		inquirer.prompt({
			name: "name",
			type: "input",
			message: "What is the name of the product?"
		}).then(function(answer) {
			name = answer.name;
			inquirer.prompt({
				name: "department",
				type: "input",
				message: "What is the name of the department?"
			}).then(function(answer) {
				department = answer.department;
				inquirer.prompt({
					name: "price",
					type: "input",
					message: "What is the price of the product?"
				}).then(function(answer) {
					price = answer.price;
					inquirer.prompt({
						name: "stock",
						type: "input",
						message: "How many units would you like to add?"
					}).then(function(answer) {
						stock = answer.stock;
						var query = "INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)" +
						" VALUES (?, ?, ?, ?, ?)";
						connection.query(query, [itemID, name, department, price, stock], function(err, res) {
							console.log("The new product has been added!");
						});
						connection.end();
					});
				});
			});
		});
	});
}











