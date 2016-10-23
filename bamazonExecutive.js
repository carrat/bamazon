//Create another Node app called BamazonExecutive.js. Running this application will list a set of menu options:

//View Product Sales by Department
//Create New Department
//When an executive selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

//DepartmentID	DepartmentName	OverHeadCosts	ProductSales	TotalProfit
//01	Electronics	10000	20000	10000
//02	Clothing	60000	100000	40000
//The TotalProfit should be calculated on the fly using the difference between OverheadCosts and ProductSales. TotalProfit should not be stored in any database. You should use a custom alias.

//If you can't get the table to display properly after a few hours, then feel free to go back and just add TotalProfit to the Departments table.

//Hint: You will need to use joins to make this work.

//Hint: You may need to look into grouping in MySQL.

//HINT: There may be an NPM package that can log the table to the console. What's is it? Good question :)

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
		type:'rawlist' ,
		message: 'Select your desired action:',
		choices: [ "View Product Sales by Department", "Create New Department"]
		}
	]).then(function(data) {
		// They submitted the form, check their entry
		selectMethod(data.action);	
	})
};

function selectMethod(choice) {

	switch(choice) {
		case 1:
	        viewSales();
	        break;
	    case 2:
	        createDepartment();
	        break;
	    default:
	        'No Function Defined'
	}


}

function viewSales() {

	




};

function createDepartment() {


	
};