const inquirer = require('inquirer');
const mysql = require('mysql2')
const connection = require('./db/connection');

 require('console.table');
 
connection.connect((error) => {
    if (error) throw error;
    menuPrompt();
})

require('console.table');

function menuPrompt(){
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
           'Quit',
        ]
    }
]).then((answers) => {
    const { choices } = answers;
    switch(choices){
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
        case 'Quit':
            connection.end();
            break;
    }
}).catch((err) => {
    if(err) throw err;
})
}
function viewDepartments(){
    const sql = `SELECT department.id, department.name AS Department FROM department;`
    connection.promise().query(sql, (err, response) => {
        if (err) {
            console.log(err)
            return;
        }
        console.table(response);
        menuPrompt();

    })
}
function viewEmployees() {
let sql = `SELECT employee.id,
            employee.first_name,
            employee.last_name,
            role.title AS role,
            department.name AS department,
            role.salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department);`
           connection.query(sql, (error, response) => {
                if (error) throw error;
                console.table(response);
                menuPrompt();
            })
            

}

const viewRoles = () => {
    const sql = `SELECT role.id, role.title AS role, role.salary, department.name AS department FROM role INNER JOIN department ON (department.id = role.department_id) ORDER by employee.id;`;
   ;
    connection.promise().query(sql, (error, response) => {
        if (error) {
            console.log(error);
            return;
        }
        console.table(response);
        menuPrompt();
    })
}
const createDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter department name you wish you create'
        }
    ]).then((answer) => {
        const sql = `INSERT INTO department(name) VALUES('${res.department}')`
        const deptAnswer = [answer.department]
        connection.query(sql, answer.department, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(answer.department + "created")
            viewDepartments();
        })
    })
}
const createRole = () => {
    const mysql = `SELECT * FROM department`;
    connection.promise().query(mysql, (error, response) => {
        departmentArrangement = response.map(departments => ({
            name: departments.name,
            value: departments.id
        }));
        return inquirer.prompt([
            {
                type: 'input',
                name: 'role',
                message: 'Enter role',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Choice the correct department',
                choices: departmentArrangement
            },
            
        ]). then((res) => {
            const sql = `INSERT INTO role SET title='${res.title}', salary = ${res.salary}, department_id= ${res.department};`
            connection.promise().query(sql, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
            })
        })
        
    })

}

const addEmployee = () => {
    const sqlRoles = `SELECT id, title FROM role`;
    const sqlManagers = `SELECT id, CONCAT(first_name, '', last_name) As name FROM employee`;

    Promise.all([
        connection.promise().query(sqlRoles),
        connection.promise().query(sqlManagers)
    ])
    .then(([rolesResponse, managersResponse]) => {
        const roles = rolesResponse[0];
        const managers = managersResponse[0];

        inquirer 
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: "Enter the employee's first name"
            },
            {
                name: 'lastName',
                type: 'input',
                message: "Enter the employee's last name"
            },
            {
                name: 'employeeRole',
                type: 'list',
                message: "Enter the employee's role in the company",
                choices: roles.map((role) => ({ name: role.title, value: role.id}))
            },
            {
                name: 'managerOption',
                type: 'list',
                message: "Does employee work under a manager?",
                choices: [
                    { name: "Yes, select current manager", value: 'current'},
                    { name: "No, insert new manager", value: 'insert'}
                ],
            },
            {
                name: 'managerId',
                type: 'list',
                message: "Select the employee's current manager",
                choices: managers.map((manager) => ({ name: manager.name, value: manager.id})),
                when: (answers) => answers.managerOption === "current",
            },
            {
                name: 'managerFirstName',
                type: 'input',
                message: "Enter the manager's first name",
                when: (answers) => answers.managerOption === 'insert',
            },
            {
                name: 'managerLastName',
                type: 'input',
                message: "Enter the manager's last name",
                when: (answers) => answers.managerOption === 'insert',
            },
            ])
            .then((answers) => {
                const { firstName, lastName, roleId, managerOption, managerId, managerFirstName, managerLastName } = answers;

                if (managerOption === 'insert'){
                    const sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`;
                    connection.query(sql, [managerFirstName, managerLastName, roleId], (error, response) => {
                        if (error) throw error;
                        createEmployee(firstName, lastName, roleId, response.insertId);
                    })
                } else {
                    createEmployee(firstName, lastName, roleId, managerId);
                }
            })
    })
    .catch((error) => {
        throw error;
    })
};
const createEmployee = (firstName, lastName, roleId, managerId) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [firstName, lastName, roleId, managerId], (error, response) => {
        if (error) throw error;
        menuPrompt()
    })

}

const employeeRole = () => {
    const sqlRoles = `SELECT id, title FROM role`;
    const sqlEmployees = `SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee`;
  
    Promise.all([
      connection.promise().query(sqlRoles),
      connection.promise().query(sqlEmployees),
    ])
      .then(([rolesResponse, employeesResponse]) => {
        const roles = rolesResponse[0];
        const employees = employeesResponse[0];
  
        inquirer
          .prompt([
            {
              name: 'employee',
              type: 'list',
              message: 'Which employee has a new role?',
              choices: employees.map((employee) => employee.name),
            },
            {
              name: 'roleId',
              type: 'list',
              message: 'What is the new role ID for this employee?',
              choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
              })),
            },
          ])
          .then((answers) => {
            const { employee, roleId } = answers;
            const [firstName, lastName] = employee.split(' ');
  
            const sql = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`;
            connection.query(sql, [roleId, firstName, lastName], (error) => {
              if (error) throw error;
             
              promptUser();
            });
          });
      })
      .catch((error) => {
        throw error;
      });
  };



