INSERT INTO department (id,  dept_name)
VALUES (0001, "Engineering"),
       (0002, "Finance"),
       (0003, "Legal"),
       (0004, "Sales");   

INSERT INTO table_role (id, title , Salary, department_id)
VALUES (01, "Salesperson",50000, 0004),
       (02, "Software Engineer",75000, 0001),
       (03, "Accountant", 10000, 0002),
       (04, "Finance", 60000 ,0002),
       (05, "Lead Engineer", 80000, 0001);
       
INSERT INTO employee (id, first_name, last_name, role_id,manager_id)
VALUES (1, "Arthur", "Miller", 01 , NULL),
       (2, "Chinua", "Achebe", 02, 1),
       (3, "Margaret", "Atwood", 03 ,1),
       (4, "Gabriel", "Garcia Marquez", 04, NULL),
       (5, "Simone", "de Beauvoir", 05, 4);