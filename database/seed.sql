USE workforcedb;

INSERT INTO dept (id, name)
VALUES 
(1, 'Human Resources'),
(2, 'Accounting'),
(3, 'Engineering'),
(4, 'Manufacturing'),
(5, 'Sales'),
(6, 'Research & Development');

INSERT INTO role (title, salary, dept_id)
VALUES 
('HR Specialist', 55000, 1),
('Accounting Manager', 80000, 2),
('Software Engineer', 95000, 3),
('Machine Technician', 75000, 4),
('Sales Associate', 52500, 5),
('Scientist', 125000, 6),
('Research Associate', 50000, 6);


