const inquirer = require('inquirer');
const connection = require('./db/connection');

require('console.table');

function introPrompt(){
inquirer.prompt([
    {
        type: 'list',
        name: 'menu',
        message: 'Select your choice',
        choices: [
           'View Employees',
           'View Departments',
           'View Roles',
           'Add an Employee',
           'Create a Role',
           'Create a Department',
           'Employee Role modification',
        ]
    }
]).then((res) => {
    console.log(res.menu);
    switch(res.menu){
        case 'View Employees':
        viewEmployees();
        break;
        case 'View Departments':
            viewDepartments();
        break;
        case 'View Roles':
                viewRoles();
        break;
        case 'Add an Employee':
            addEmployee();
         break;
         case 'Create a Role':
            createRole();
        break;
        case 'Create a Department':
            createDepartment();
        break;
        case 'Employee Role Modification':
            employeeRole();
        break;
    }
}).catch((err) => {
    if(err) throw err;
})
}
