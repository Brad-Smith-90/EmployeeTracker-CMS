-- Insert departments
INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Finance');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES 
('Sales Manager', 80000, 1),
('Software Engineer', 100000, 2),
('Accountant', 70000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Ron', 'Popeil', 1, NULL),
('Alan', 'Turing', 2, 1),
('JP', 'Morgan', 3, 1);
