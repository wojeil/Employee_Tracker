//trial 2 

//Updating Employee Function//
// function updateEmployee() {
//   viewEmployeesWithId();
//   var query = "SELECT * FROM employee";
//   connection.query(query, function (err, results) {
//     if (err) throw err;
//     //First Prompt to grab an Employee//
//     inquirer
//       .prompt(
//         {
//           name: "id",
//           type: "input",
//           message: "Select an Employee by thier ID:"
//         }

//       )
//       .then(function (answer) {
//         for (let i = 0; i < results.length; i++) {
//           if (results[i].id === answer.id) {
//             var employeeID = results[i].id;
//             //Call back next prompt that will change employee role//

//           }

//           // return to start menue if ID doesn't exist//
//           // console.log("ID is not valid");
//           // start();

//         }
//         updateEmployeeCont();
//         //function for continued second prompt//
//         function updateEmployeeCont() {
//           var query = "SELECT * FROM role";
//           connection.query(query, function (err, results) {
//             if (err) throw err;
//             inquirer
//               .prompt(
//                 {
//                   name: "role",
//                   type: "rawlist",
//                   message: "Please select a role from the list below:",
//                   //will list all the role titles
//                   choices: function () {
//                     var choiceArray = [];
//                     for (var i = 0; i < results.length; i++) {
//                       choiceArray.push(results[i].title);
//                     }
//                     return choiceArray;
//                   }
//                 }
//               )
//               .then(function (answer) {
//                 //loop go over all the role table items//
//                 for (let index = 0; index < results.length; index++) {
//                   //if title in table role matches the selected answer in prompt//   
//                   if (results[index].title === answer.role) {
//                     //create var to match the ID's//
//                     var idRole = results[index].id;
//                   }

//                 }
//                 connection.query(
//                   "UPDATE employee SET ? WHERE ?",
//                   [
//                     {
//                       role_id: idRole
//                     },
//                     {
//                       id: employeeID
//                     }
//                   ],
//                   function (err, res) {
//                     if (err) throw err;
//                     console.log(res.affectedRows + " Employee updated!\n");
//                     start();

//                   }
//                 );
//               })
//           })
//         }

//       }
//       )
//   })
// }