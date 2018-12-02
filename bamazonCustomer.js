var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // don't forget to change your username!
    user: " ",
    
    // and include your password!
    password: " ",

    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    
    customerStart();
});

// display items on sale at start of program
function customerStart() {
    connection.query("SELECT * FROM products", function(err, res) {
        
        console.log("-------------------------------------------------");

        //using console.table to create our preformated table!
        var table = cTable.getTable(res);

        console.log(table);

        console.log("-------------------------------------------------");

        customerPrompt();
        // connection.end();
    });
};

function updateDatabase(id, quantity, stock) {
    var stockChange = stock - quantity;
    var query = "UPDATE products SET stock_quantity = " + stockChange + " WHERE item_id = " + id;
    connection.query(query, function(err, res) {
        console.log("Purchase complete!");
    });
};

// request input from client
function customerPrompt() {
    inquirer
     .prompt([
         {
            name: "id",
            type: "input",
            message: "What is the ID of the item you'd like to buy?",
            validate: function validateID(name) {
                if (isNaN(name)) {
                    console.log("You must enter a number!")
                    return false;
                }
                return true;
            }
         },
         {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
         }
     ])
     .then(function(answer) {
         var query = "SELECT * FROM products WHERE ?";
         connection.query(query, {item_id: answer.id}, function(err, res) {
            if (answer.quantity > res[0].stock_quantity) {
                console.log("There is insufficent quantity for you to buy!");
            } else if (answer.quantity === res[0].stock_quantity) {
                var total = answer.quantity * res[0].price;
                console.log("Congratulations! You got the last of it! The total cost will be $" + total);
                updateDatabase(answer.id, answer.quantity, res[0].stock_quantity);
            } else {
                var total = answer.quantity * res[0].price;
                console.log("Your purchase is complete! Your total will be $" + total);
                updateDatabase(answer.id, answer.quantity, res[0].stock_quantity);
            }

            connection.end();
         });
     });
};