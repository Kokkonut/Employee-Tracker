USE employee_db;

INSERT into department (name) VALUES ("Coaching");
INSERT into department (name) VALUES ("Player");
INSERT into department (name) VALUES ("G-League");
INSERT into department (name) VALUES ("Cleaner");

INSERT into role (title, salary, department_id) VALUES ("Coach", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Point gaurd", 50000, 1);
INSERT into role (title, salary, department_id) VALUES ("Power Forward", 100000, 2);
INSERT into role (title, salary, department_id) VALUES ("Small Forward", 900000, 2);
INSERT into role (title, salary, department_id) VALUES ("Shooting Guard", 100000, 3);
INSERT into role (title, salary, department_id) VALUES ("Bench Warmer", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Water Boy", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Point Forward", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Who Knows", 80000, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("James", "Harden", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Joel", "Embiid", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Tyresse", "Maxey", 2, 1);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("PJ", "Tucker", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("de'Anthony", "Melton", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Tobias", "Harris", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Montrezl", "Harrel", 4, 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Matisse", "Thybulle", 5, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Shake", "Milton", 6, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Georges", "Niang", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Furkan", "Korkmaz", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Paul", "Reed", 8, 5);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jaden", "Springer", 9, null);