var inquirer = require('inquirer');





const start =()=> {

  inquirer
  .prompt([
    {
      type: "input",
      message: "What would you like tot do?",
      name: "option",
    }
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });

} 
