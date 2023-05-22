/*Departments: names, ids
Roles: job title, role id, department, salary
Employees: employee id, first name, last name, job title, department, salaries, managers
 */

INSERT INTO department(name, id)
VALUES  ("Administration", 1),
        ("Accounting", 2),
        ("Enginnering", 3),
        ('Reception', 4),
        ('Sanitation', 5);

INSERT INTO roles(title, id, department_id, salary)
        ("CEO", 1, 1, 200000),
        ('Assistant Director', 2, 1, 120000),
        ("Accountant", 3, 2, 65000),
        ("Junior Developer", 4, 3, 60000),
        ("Software Engineer", 5, 3, 80000),
        ('Receptionist', 6, 4, 35000),
        ("Janitor", 7, 5, 25000);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUE ("Derek", "Lee", 1, null),  /* CEO */
        ('Jessica', 'Knowles', 2, 1) /* Assistant Director */
        ("Kyle", "Reese", 3, 1), /* Accountant */
       ("Dwayne", "Micheals", 4, 3), /* Junior Developer */
       ("Charlie", "Winters", 5, 1), /* Software Engineer */
       ('Amber', "Summers", 6, 1),  /* Receptionist */
       ('Frank', 'Jacobs', 7, 1)    /* Janitor

/* Manager ID 1: Jessica Knowles
   Manager ID 2: Derek Lee
   Manager ID 3: Charlie Winters

