/*Departments: names, ids
Roles: job title, role id, department, salary
Employees: employee id, first name, last name, job title, department, salaries, managers
 */

INSERT INTO department (name)
VALUES  ("Administration"),
        ("Accounting"),
        ("Enginnering"),
        ('Reception'),
        ('Sanitation');

INSERT INTO role (title, salary, department_id)
 VALUES ("CEO", 200000, 1),
        ("Assistant Director", 120000, 1),
        ("Accountant", 65000, 2),
        ("Junior Developer", 60000, 3),
        ("Software Engineer", 80000, 3),
        ('Receptionist', 35000, 4),
        ("Janitor", 25000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Derek", "Lee", 1, null),  /* CEO */
        ("Jessica", "Knowles", 2, 1), /* Assistant Director */
        ("Kyle", "Reese", 3, 1), /* Accountant */
       ("Dwayne", "Micheals", 4, 3), /* Junior Developer */
       ("Charlie", "Winters", 5, 1), /* Software Engineer */
       ("Amber", "Summers", 6, 1),  /* Receptionist */
       ("Frank", "Jacobs", 7, 1) ;   /* Janitor



