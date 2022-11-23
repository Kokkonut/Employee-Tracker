
DROP DATABASE IF EXISTS employees_DB;
CREATE database employees_DB;

USE employees_DB;

CREATE TABLE Departments (
  dept_id       INTEGER         AUTO_INCREMENT      NOT NULL,
  name          VARCHAR(100)                        NOT NULL,
  PRIMARY KEY (dept_id)
);

CREATE TABLE Roles (
  role_id       INTEGER         AUTO_INCREMENT      NOT NULL,
  title         VARCHAR(100)                        NOT NULL,
  salary        DECIMAL(10,2)                       NOT NULL,
  dept_id       INTEGER,
  PRIMARY KEY (role_id),
  FOREIGN KEY (dept_id) REFERENCES Departments(dept_id)
);

CREATE TABLE Employees (
  emp_id        INTEGER         AUTO_INCREMENT      NOT NULL,
  first_name    VARCHAR(30)                         NOT NULL,
  last_name     VARCHAR(30),
  role_id       INTEGER,
  manager_id    INTEGER,
  PRIMARY KEY (emp_id),
  FOREIGN KEY (role_id) REFERENCES Roles(role_id),
  FOREIGN KEY (manager_id) REFERENCES Employees(emp_id)
);
