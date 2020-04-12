var mysql = require("mysql");
var inquirer = require('inquirer');
var { printTable } = require('console-table-printer');


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
          "Update an Employee",
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
        
        case "Update an Employee":
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
      printTable(res);
        // console.log("Departments:")
        // for (var i = 0; i< res.length; i++) {
        //     console.log(res[i].name); 
        // }
        // console.log("---------------------------------------")
        // console.log("---------------------------------------")

        start();
              
        });

}

//Viewing Roles://

function viewRoles (){
    var query = "SELECT title, salary, name ";
    query += "FROM role INNER JOIN department ON (role.department_id = department.id)";
    connection.query(query, function (err, res,) {
        if (err) throw err;
        printTable(res);
        // console.log("Roles:")
        // for (var i = 0; i< res.length; i++) {
        //     console.log(`Title: ${res[i].title}   ||   Salary: ${res[i].salary}   ||   Department: ${res[i].name}`); 
        // }
        // console.log("---------------------------------------")
        // console.log("---------------------------------------")

        start();
              
        });

}

//Viewing Employees://

function viewEmployees (){
  var query = "SELECT first_name, last_name, title ";
  query += "FROM employee INNER JOIN role ON (employee.role_id = role.id)";
  connection.query(query, function (err, res,) {
      if (err) throw err;
      printTable(res)
      // console.log("Employees:")
      // for (var i = 0; i< res.length; i++) {
      //     console.log(`First Name: ${res[i].first_name}   ||   Last Name: ${res[i].last_name}   ||   Title: ${res[i].title}`); 
      // }
      // console.log("---------------------------------------")
      // console.log("---------------------------------------")

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
  var query = "SELECT * FROM department";
  
  connection.query(query,function(err, results){
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
      for (let index = 0; index < results.length; index++) {
        
        if(results[index].name === answer.department){
          var idDep = results[index].id;
        }
        
      }
     
        connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.role,
          salary: answer.salary,
          department_id: idDep


        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " has been inserted inserted!\n");
          
          start();
        
        }
      );
    })
    })
}

//Adding a new Employee://

function addEmployee(){
  var query = "SELECT * FROM role";
  
  connection.query(query,function(err, results){
    if (err) throw err;
  inquirer
    .prompt([
    
    {
      name: "first_name",
      type: "input",
      message: "Enter First Name:"
    },
    {
      name: "last_name",
      type: "input",
      message: "Enter Last Name:"

    },
    {
      name: "role",
      type: "rawlist",
      message: "Please select a role from the list below:",
      choices: function(){
        var choiceArray =[];
        for(var i =0; i < results.length; i++){
          choiceArray.push(results[i].title);
        }
        return choiceArray;
      }
      
    }
  ])
   
    .then(function(answer){
      for (let index = 0; index < results.length; index++) {
        
        if(results[index].title === answer.role){
          var idRole = results[index].id;
        }
        
      }
     
        connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: idRole


        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " has been inserted inserted!\n");
          
          start();
        
        }
      );
    })
    })

}

function updateEmployee(){
  //call back view employees//
  viewEmployeesWithId();
  //have the role table to be selected for choices//
  var query = "SELECT * FROM role";
  connection.query(query,function(err, results){
    if (err) throw err;
  inquirer
  .prompt([
    {
    name: "id",
    type: "input",
    message: "Select an Employee by their ID:"
    },
    {
      name: "role",
      type: "rawlist",
      message: "Please select a role from the list below:",
      //will list all the role titles
      choices: function(){
        var choiceArray =[];
        for(var i =0; i < results.length; i++){
          choiceArray.push(results[i].title);
        }
        return choiceArray;
      }
      
    }
  ])
  .then(function(answer){
    //loop go over all the role table items//
    for (let index = 0; index < results.length; index++) {
    //if title in table role matches the selected answer in prompt//   
      if(results[index].title === answer.role){
    //create var to match the ID's//
        var idRole = results[index].id;
      }
      
    }
    connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          role_id: idRole
        },
        {
          id: answer.id
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " Employee updated!\n");
        start();
       
      }
      
    );
  
  })


}
)}

// Extra function to view Employees with their ID's//
function viewEmployeesWithId (){
  var query = "SELECT employee.id, first_name, last_name, title ";
  query += "FROM employee INNER JOIN role ON (employee.role_id = role.id)";
  connection.query(query, function (err, res,) {
      if (err) throw err;
      printTable(res)
     });
}