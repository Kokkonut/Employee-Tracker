const inquirer = require('inquirer');

const mainMenuPrompts = () => {
    return inquirer.prompt (
        [
            {
                type: 'list',
                name: 'mainMenu',
                message: 'Please make a selection',
                choices: [
                    'View all departments',
                    'View all roles',
                    'view all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employees',
                    'Update an employee role',
                    'EXIT application'
                ],
            },
        ]
    )
};

const addDepartmentPrompts = () => {
    return inquirer.prompt (
        [
            {
                type: 'input',
                name: 'newDepartment',
                message: 'Please enter the name of the department you would like to create',
                validate: newDpt => {
                    if (newDpt) {
                        return true;
                    } else {
                        console.log('Please enter a valid department name!');
                        return false;
                    }
                }
            },
        ]
    )
};

const addRolePrompts = () => {
    return inquirer.prompt (
        [
            {
                type: 'input',
                name: 'roleName',
                message: 'Please enter the name of the role',
                validate: roleName => {
                    if (roleName) {
                        return true;
                    } else {
                        console.log('Please enter a name for the role!');
                        return false;
                    }
                }
            },

            {
                type: 'input',
                name: 'roleSalary',
                message: 'Please enter the salary of the role',
                validate: roleSalary => {
                    if (isNan(roleSalary)) {
                        return true;
                    } else {
                        console.log('Please enter a name for the role!');
                        return false;
                    }
                }
            },
        ]
    )
};