//Dependencies found here
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const db = require(".");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Thunder1969",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    run();
});


function run() {
    inquirer
        .prompt({
            type: 'list',
            choices: [
                'VIEW all departments', //done
                'VIEW all roles', //done
                'VIEW all employees',//done
                'VIEW employess by manager',
                'VIEW employess by department',
                'ADD Department',//done
                'ADD Role', //done
                'ADD employee', //next
                'UPDATE empployee by role',//next
                'UPDATE employee managers',
                'DELETE department',
                'DELETE Role',
                'DELETE employee',
                'VIEW utilized budget',
                'QUIT'
            ],
            Message: 'What would you like to do?',
            name: 'option'
        })

        .then(function (result) {
            console.log(`You entered ${result.option}`)

            switch (result.option) {
                case 'VIEW all departments':
                    viewDepartment();
                    break;
                case 'VIEW all roles':
                    viewRoles();
                    break;
                case 'VIEW all employees':
                    viewEmployees();
                    break;
                case 'VIEW employess by manager':
                    viewEmployeesByManager();
                    break;
                case 'VIEW employess by department':
                    viewEmployeesBydepartment();
                    break;
                case 'ADD Department':
                    addDepartment();
                    break;
                case 'ADD Role':
                    addRole();
                    break;
                case 'ADD employee':
                    addEmployee();
                    break;
                case 'UPDATE empployee by role':
                    updateEmployeeByRole();
                    break;
                case 'UPDATE employee managers':
                    updateEmployeeManagers();
                    break;
                case 'DELETE department':
                    deleteDepartment();
                    break;
                case 'DELETE Role':
                    deleteRole();
                    break;
                case 'DELETE employee':
                    deleteEmployee();
                    break;
                case 'VIEW utilized budget':
                    viewBudget();
                    break;
                default:
                    quit()
            }
        })

}



// VIEW ALL DEPARTMENTS -----------------------------------------
const viewDepartment = () => {

    let query =
        `
    SELECT department.name, department.id
    FROM department
    `
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        run();
    });
};

// VIEW ALL ROLES ------------------------------------------------
const viewRoles = () => {
    let query =
        `
        SELECT role.title, role.id, department.name AS Deparment, role.salary
        FROM role
        JOIN department ON department_id = department.id
        `
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        run();
    });
};

//VIEW ALL EMPLOYEES ---------------------------------------------
const viewEmployees = () => {
    let query =
        `SELECT 
        employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager 
        FROM employee 
        LEFT JOIN role on role.id = employee.role_id 
        LEFT JOIN department on department.id = role.department_id 
        LEFT JOIN employee e on employee.manager_id = e.id;
        `
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        run();
    });
};


const viewEmployeesByManager = () => {

};


const viewEmployeesBydepartment = () => {

};

//ADD DEPARTMENT---------------------------------
const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: `name`,
                type: `input`,
                Message: `What is the name of the department`
            },
        ])
        .then((answer) => {
            const query = `INSERT INTO department (name) VALUES (?)`;
            const params = [answer.name];
            connection.query(query, params, function (err, res) {
                if (err) throw err;
                console.log('Department added succsesfully');
                run();
            })
        })

};


//GET DEPARTMENTS FOR ADD ROLE FUNCTION --------------------------------
let deptArr = []
const getDepartments = () => {
  
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
          deptArr.push(res[i].name);
        }
    })
    return deptArr;
};


//ADD ROLE ------------------------------------------------------------
const addRole = () => {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.id AS Department FROM department;",   function(err, res) {
        inquirer.prompt([
            {
              name: "title",
              type: "input",
              message: "What is name of the new role?"
            },
            {
              name: "salary",
              type: "input",
              message: "What is the salary of the new role?"
            } ,
            {
                name: 'deptId',
                type: 'input',
                message: 'What is the department ID?'
            }

            // not working: cant call answers.choices
            // {
            //   name: "department",
            //   type: "rawlist",
            //   message: "Under which department does this new role fall?",
            //   choices: getDepartments()
            // }
        ]).then(function(answers) {
            //let deptId = getDepartments().indexOf(answers.choices) + 1;
            connection.query(
                "INSERT INTO role SET ?",
                {
                  title: answers.title,
                  salary: answers.salary,
                  department_id: answers.deptId,
                },
                function(err) {
                    if (err) throw err
                    console.table(answers);
                    run();
                }
            )     
        });
      });
};

// ROLE ARRAY SET UP FOR EMPLOYEE ADDITION _____________________
let roleArr = [];                                            
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  })
  return roleArr;
}

// MANAGER ARRAY SET UP FOR EMPLOYEE ADDITION ____________________
let managersArr = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }
  })
  return managersArr;
}

//ADD EMPLOYEE ------------------------------------------------------
const addEmployee = () => {
inquirer
    .prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'First Name:'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Last Name:'
        }, 
        {
            name: "role",
            type: "list",
            message: "What is the new employee's title? ",
            choices: selectRole()
          },
          {
              name: "choice",
              type: "list",
              message: "Who is managing the new employee? ",
              choices: selectManager()
          }
        
        // {
        //     name: 'role',
        //     type: 'input',
        //     message: 'What is the new employees title?'
        // },
        // {
        //     name: 'choice',
        //     type: 'input',
        //     message: 'Who is managing the new employee?'
        // },
    ]).then(function (answers) {
        var roleId = selectRole().indexOf(answers.role) + 1
        var managerId = selectManager().indexOf(answers.choice) + 1
        connection.query("INSERT INTO employee SET ?", 
        {
            first_name: answers.firstName,
            last_name: answers.lastName,
            manager_id: managerId,
            role_id: roleId
            
        }, 
        function(err){
            if (err) throw err
            console.table(answers)
            run()
        })
  
    })
};


const updateEmployeeByRole = () => {

};


const updateEmployeeManagers = () => {

};


const deleteDepartment = () => {

};


const deleteRole = () => {

};


const deleteEmployee = () => {

};


const viewBudget = () => {

};

