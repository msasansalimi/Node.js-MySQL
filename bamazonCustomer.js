var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});
//Below function for creating connection to our sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        start();
        // connection.end();
    });
}
//start function that prompt user request and after checking the table on sql data base response accordingly
function start() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "list",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_id + "-" + results[i].product_name);
                        }

                        return choiceArray;
                    },
                    message: "What is the ID and the Name of the product you would like to Buy?",
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many units you would like to buy?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                //  console.log(answer.choice);

                var userChoice;
                var updatedStock;
                var userInvoice;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id + "-" + results[i].product_name === answer.choice) {
                        console.log("We have" + " " + results[i].stock_quantity + " " + "in our stock.");
                        updatedStock = results[i].stock_quantity - answer.quantity;
                        userInvoice = answer.quantity * results[i].price;
                        userChoice = results[i];
                    }

                }
                //checking the stock availability base on our sql database availability
                if (userChoice.stock_quantity > parseInt(answer.quantity)) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: updatedStock
                            },
                            {
                                item_id: userChoice.item_id
                            }
                        ],

                        function (err) {
                            if (err) { throw err };
                            console.log("Order placed successfully!");
                            console.log("Here is your invoice: " + "$" + userInvoice);

                        }
                        

                    );
                    connection.end(); 

                }
                else {
                    console.log("Sorry...Insufficient Quantity! You can choose less quantity or another item.");
                    start();
                }
                
               

            });
            
    });
    
}