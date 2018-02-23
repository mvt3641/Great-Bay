var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
 host: "localhost",
 port: 3000,

 // Your username
 user: "root",

 // Your password
 password: "DodgeCity41",
 database: "greatbay_db"
});

connection.connect(function(err) {
 if (err) throw err;
 start();

});

function start(){
  inquirer
  .prompt([
  {
   type: 'list',
   message: 'What would you like to do?',
   name:'option',
   choices:["post", "bid"]
 }
  ]).then (function(answer){
      if(answer.option === 'post'){
        postAuction();
      } else{
        bidAuction();
      };
  })
}


///Post Function//
function postAuction(){

 inquirer
 .prompt([
  {
   name:"item",
   type:"input",
   message:"What item would you like to add?"
 },
 {
   name:"category",
   type:"input",
   message:"What is the category of the item you would like to add?"
 },
 {
   name:"bid",
   type:"input",
   message:"Starting bid?"
 },
 {
   name:"quantity",
   type:"input",
   message:"How many?"
 }
]).then(function(answer){
 console.log("Inserting a new item...\n");
 var query = connection.query(
   "INSERT INTO greatbay SET ?",
   {
     item:  answer.item,
     category: answer.category,
     price: answer.bid,
     quantity: answer.quantity
   },
   function(err, res) {
     console.log("Item: "+answer.item+
      "Category: "+answer.category+
     "Starting Bid: "+answer.bid+
     "Quantity: "+answer.quantity
    );
     console.log("Your auction post was sucessful!");
     // Call updateProduct AFTER the INSERT completes
   }
 );
 //start();
});
start();
}
 //// Function for BiD///
 function bidAuction(){
   console.log("Showing avalible items...\n");
   connection.query("SELECT * FROM greatbay", function(err, results) {
     if (err) throw err;
     // Log all results of the SELECT statement
     inquirer
     .prompt([
       {
       name: 'choice',
       message: 'Please choose an item',
       type: 'rawlist',
       choices: function(){
         var choiceArr =[];
         for (var i=0;i<results.length;i++){
           choiceArr.push(results[i].item);
         }
         return choiceArr;
       }
     },
     {
      name: "bid",
      type: "input",
      message: "How much would you like to bid?"
     }
   ]).then(function(answer){
     var bidChoice;
     for( var i=0;i<results.length;i++){
       if(results[i].item === answer.choice){
         bidChoice = results[i];
       }
     }
 ///determine if bid is high enough
 if (bidChoice.price < parseInt(answer.bid)){
   //update db if bid was high enough
   connection.query(
     "UPDATE auctions SET ? WHERE ?",
     [
       {
         price: answer.bid
       },
       {
         id: bidChoice.id
       }
     ],
     function(error){
       if(error) throw err,
       console.log("Bid placed successfully!");
       start();
     }
   );
 }
 else{
   console.log("Your current bid is too low..try again");
   start();
   }
 })
  })

   };
