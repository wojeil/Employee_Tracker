var mysql = require("mysql");
var inquirer = require('inquirer');


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root8",
  database: "employee_tracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  
  start();
  
});


// First Prompt//
function start() {
    inquirer
      .prompt({
        name: "options",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.options) {
        case "View Departments":
          viewDepartments();
          break;
  
        case "View Roles":
          viewRoles();
          break;
  
        case "View Employees":
          viewEmployees();
          break;
  
        case "Add a Department":
          addDepartment();
          break;
  
        case "Add a Role":
          addRole();
          break;

        case "Add an Employee":
          addEmployee();
            break;
        
        case "Add an Employee":
          updateEmployee();
          break;
            
        case "Exit":
          connection.end();
            break;
        }
      });
  }

//Viewing Dapartments://

function viewDepartments (){
    connection.query('SELECT * FROM `department`', function (err, res,) {
        if (err) throw err;
        console.log("Departments:")
        for (var i = 0; i< res.length; i++) {
            console.log(res[i].name); 
        }
        console.log("---------------------------------------")
        console.log("---------------------------------------")

        start();
              
        });

}

//Viewing Roles://

function viewRoles (){
    var query = "SELECT title, salary, name ";
    query += "FROM role INNER JOIN department ON (role.department_id = department.id)";
    connection.query(query, function (err, res,) {
        if (err) throw err;
        console.log("Roles:")
        for (var i = 0; i< res.length; i++) {
            console.log(`Title: ${res[i].title}   ||   Salary: ${res[i].salary}   ||   Department: ${res[i].name}`); 
        }
        console.log("---------------------------------------")
        console.log("---------------------------------------")

        start();
              
        });

}

//Viewing Employees://

function viewEmployees (){
  var query = "SELECT first_name, last_name, title ";
  query += "FROM employee INNER JOIN role ON (employee.role_id = role.id)";
  connection.query(query, function (err, res,) {
      if (err) throw err;
      console.log("Employees:")
      for (var i = 0; i< res.length; i++) {
          console.log(`First Name: ${res[i].first_name}   ||   Last Name: ${res[i].last_name}   ||   Title: ${res[i].title}`); 
      }
      console.log("---------------------------------------")
      console.log("---------------------------------------")

      start();
            
      });

}

//Adding a new department://

function addDepartment (){
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "New Department:"
    })
    .then(function(answer){
        connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " has been inserted inserted!\n");
          
          start();
        
        }
      );
    })
}

//Adding New Role://

function addRole (){
  //query data base first to add array of choices//
  var query = "SELECT title, salary, name ";
  query += "FROM role INNER JOIN department ON (role.department_id = department.id)";
  connection.query(query, function(err, results) {
    if (err) throw err;
  inquirer
    .prompt([
    
    {
      name: "role",
      type: "input",
      message: "New Role:"
    },
    {
      name: "salary",
      type: "input",
      message: "Enter a Salary for the role: "

    },
    {
      name: "department",
      type: "rawlist",
      message: "Please select a department from the list below:",
      choices: function(){
        var choiceArray =[];
        for(var i =0; i < results.length; i++){
          choiceArray.push(results[i].name);
        }
        return choiceArray;
      }
      
    }
  ])
   
    .then(function(answer){
        connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.role,
          salary: answer.salary,
          name: answer.department,


        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " has been inserted inserted!\n");
          
          start();
        
        }
      );
    })
})}

   