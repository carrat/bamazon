//create a Node application called BamazonCustomer.js. Running this application will first display 
//all of the items available for sale. Include the ids, names, and prices of products for sale.

//The app should then prompt users with two messages.

//The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.
//Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
//However, if your store does have enough of the product, you should fulfill the customer's order.

//This means updating the SQL database to reflect the remaining quantity.
//Once the update goes through, show the customer the total cost of their purchase.

var inquirer = require('inquirer');
var consoleTable = require('console.table');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: '127.0.0.1',
	port: 3306,
	user: 'root',
	password: 'Wah00sam',
	database: 'bamazon'
})


function openStore() {

	//display all prducts availabe for sale
	console.log(" ");
	console.log("Welcome to My Store");
	console.log(" ");
	console.log("******************************");
	console.log("Available Products");
	console.log("******************************");
	console.log(" ");

	showProducts();
	
}

function chooseMethod() {
// print out a user menu that allows them to choose a product to buy and a quantity
	inquirer.prompt([
		{
		name: 'product',
		type:'input' ,
		message: 'Enter the product ID of the product you would like to purchase'
		},
		{
		name: 'units',
		type:'input' ,
		message: 'Enter the quantity of the product you would like to purchase'
		}

	]).then(function(data) {
		// They submitted the form, check their entry
		var order = new Order(data.product, data.units);
		return order.stockCheck(order);
	}).then(function(data) {
		showProducts();
	});
}

function showProducts() {
	

	var availableProducts= [];
	// query database to grab all availabe products
	connection.query('SELECT id, product_name, price, stock_quantity FROM products ORDER BY department', function(err, res) {
            
        if(err) {
		console.log(err);
		}
		else {
            for (i=0; i<res.length; i++) {
            	var nextProduct = {'id': res[i].id, 'product': res[i].product_name, 'price': "$" + res[i].price.toFixed(2)};
            	availableProducts.push(nextProduct);
            }
            console.table(availableProducts);
		}

		chooseMethod();
	});
	
}

function Order(product, units) {
	this.product = product;
	this.units = units;
	this.stockCheck = function(order) {
		// query the product id and find out how many quantity are in stock
		connection.query('SELECT stock_quantity FROM products WHERE id = ?', [order.product], function(err, res){
			if(err) {
				console.log(err);
			}
			else {
				// check to see if there are more product in stock than are requested in order
				if (order.units <= res[0].stock_quantity) {
					// if there are enough in stock, place order
					// update the stock in the database
					var newStock = res[0].stock_quantity - order.units;
					order.updateStock(newStock, order);
					
				}
				else {
					console.log(" ");
					console.log(" ");
					console.log("Insufficient Quantity. Only " + res[0].stock_quantity + " of this product are currently available.");
					console.log(" ");
					console.log(" ");
				}
			}
		});	

		return order.printReceipt(order);		
	};

	this.printReceipt = function(order) {
		connection.query('SELECT * FROM products WHERE id = ?', [order.product], function(err, res){
			if(err) {
				console.log(err);
			}
			else {
				// calculate total cost
				var totalCost = parseInt(order.units) * parseFloat(res[0].price);
				// print receipt
				console.log(" ");
				console.log(" ");
				console.log("********** Receipt *************");
				console.log("You purchased " + order.units + " unit(s) of " + res[0].product_name +  " at $" 
					+ res[0].price.toFixed(2) + " for a total of $" + totalCost.toFixed(2));
				console.log("*********************************");
				console.log(" ");
				console.log(" ");
			}
		});	
		return;
	};

	this.updateStock = function(newStock, order) {
		// update stock quantity post-order
		connection.query('UPDATE products set ? WHERE ?', [
			{stock_quantity: newStock},
			{id: order.product}
		], function(err, res){

			if(err) {
				console.log(err);
			}
			else {

			}
		})	
	};
}

openStore();

