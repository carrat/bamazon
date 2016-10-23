//Create a new Node application called BamazonManager.js. Running this application will:

//List a set of menu options:

//View Products for Sale
//View Low Inventory
//Add to Inventory
//Add New Product

//If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
//If a manager selects View Low Inventory, then it should list all items with a inventory count lower than five.
//If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
//If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

//Modify your BamazonCustomer.js app so that when a customer purchases anything from the store, the program will calculate the total sales from each transaction.

//Add the revenue from each transaction to the TotalSales column for the related department.
//Make sure your app still updates the inventory listed in the Products column.


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

function chooseMethod() {

	inquirer.prompt([
		{
		name: 'action',
		type:'list' ,
		message: 'Select your desired action:',
		choices: [ "View Products for Sale",  "View Low Inventory",  "Add to Inventory",  "Add New Product"]
		}
	]).then(function(data) {
		// They submitted the form, check their entry
		
	})


	
}