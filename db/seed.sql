-- for department table --
INSERT INTO department (name) values ("HR");
INSERT INTO department (name) values ("Marketing");
INSERT INTO department (name) values ("Managment");
INSERT INTO department (name) values ("Risk Managment");
INSERT INTO department (name) values ("Sales");



-- for department table --
INSERT INTO role (title, salary, department_id) values ("HR Manager", 60000.00, 1);
INSERT INTO role (title, salary, department_id) values ("Marketing Assitant Manager", 80000.00, 2);
INSERT INTO role (title, salary, department_id) values ("Managment Senior Supervisor", 100000.00, 3);
INSERT INTO role (title, salary, department_id) values ("Risk Managment Director", 120000.00, 4);
INSERT INTO role (title, salary, department_id) values ("Sales Associate", 30000.00, 5);


-- for employee table --
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Karam", "Helloz", 1, 1 );
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Sawyou", "Jacksas", 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Mounir", "Stevens", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Fran", "Debois", 4, NULL );
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Marie", "Eid", 5, NULL);