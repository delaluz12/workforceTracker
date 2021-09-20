//object deconstruction to not have to type inquirer.prompt
const { prompt } = require('inquirer');
const query = require('./database/query');
const cTable = require('console.table');


function init() {
    console.log('Welcome to workForce CMS');
    //init inquirer prompts to grab choice
    renderPrompts();
}

init();


async function renderPrompts() {
    const { choice } = await prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPT'
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPT'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_NEW_EMPLOYEE'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
                {
                    name: 'Quit',
                    value: 'QUIT'
                }
            ]

        }
    ]);
    // console.log(choice);

    //switch statement - use choice VALUE
    switch (choice) {
        case 'VIEW_DEPT':
            viewAllDept();
            break;
        case 'ADD_DEPT':
            addDept();
            break;
        case 'VIEW_ROLES':
            viewAllRoles();
            break;
        case 'ADD_ROLE':
            addRole();
            break;
        case 'VIEW_EMPLOYEES':
            viewAllEmp();
            break;
        case 'ADD_NEW_EMPLOYEE':
            addNewEmployee();
            break;
        case 'UPDATE_EMPLOYEE_ROLE':
            updateEmpRole();
            break;
        case 'QUIT':
            quit();
            break;
        default:
            break;
    }

};
//view dept
async function viewAllDept() {
    const departments = await query.findAllDept();
    console.table(departments);
    renderPrompts();
};
// add dept
async function addDept() {
    const { newDeptName } = await prompt([
        {
            type: 'input',
            name: 'newDeptName',
            message: 'What is the name of Department?'
        }

    ]);
    // console.log(newDeptName);
    // console.log(typeof newDeptName);
    await query.newDept(newDeptName);
    console.log('New Department Successfully Added!')

    renderPrompts();

}

//view all roles
async function viewAllRoles() {
    const roles = await query.findAllRoles();
    console.table(roles);
    renderPrompts();
}
//add role
async function addRole() {
    //grab available dept for prompt choice list
    const currentDept = await query.findAllDept();
    
    const deptArr = currentDept.map(({id, name})=>{
        const dept = {
            name: name, 
            value: id
        };
        return dept;

    });
    

    const { title, salary, dept } = await prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of role you are adding? '
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary for the role? '
        },
        {
            type: 'list',
            name: 'dept',
            message: 'What is the department id this role will belong to? ',
            choices: deptArr
        },
    ]);
    console.log(title, salary, dept);
    await query.newRole(title, salary, dept);
    console.log('New Role Successfully added!');
    renderPrompts();
}

//view all emp
async function viewAllEmp() {
    const empRes = await query.findAllEmp();
    console.table(empRes);
    renderPrompts();
}

//add new employee
async function addNewEmployee() {


    //ask for new Emp first and last name to start to pass to query function
    const { first, last } = await prompt([
        {
            type: 'input',
            name: 'first',
            message: "What is the new employee's first name?"
        },
        {
            type: 'input',
            name: 'last',
            message: "What is the new employee's last name?"
        },

    ]);
    // console.log(first);
    // console.log(last);
    //grab all current roles to have as choices
    const currentRoles = await query.findAllRoles();
    // map to build array for inquirer prompt ---maps thru each object in res we get from line 174
    // console.log(currentRoles);
    const rolesChoicesArr = currentRoles.map(({ id, title, salary, dept_id }) => {
        //need to capture the role id to send into newEmployee()from query.js & title to display as a choice in the inquier prompt list choice
        const role = {
            name: title,
            value: id
        };
        return role;

    });
    const { roleChoice } = await prompt([
        {
            type: 'list',
            name: 'roleChoice',
            message: "What is the employee's Role?",
            choices: rolesChoicesArr,
        }
    ]);

    console.log(roleChoice);
    //query to empl to ask populate manager choice list for inquirer prompt
    const currentEmp = await query.findAllEmp();
    //map to build array for inquirer list's choice prompt
    const managerChoiceArr = currentEmp.map(({ id, first_name, last_name }) => {
        const manager = {
            name: `${first_name} ${last_name}`,
            value: id
        };
        return manager

    });

    const nullManagerChoice = {
        name: 'None',
        value: null
    };
    // if the emp will not have a manager choice pushed into array from line 199
    managerChoiceArr.push(nullManagerChoice);
    console.log(managerChoiceArr);
    // ask for manager and grab manager ID from choice to pass into query
    const { managerChoice } = await prompt([
        {
            type: 'list',
            name: 'managerChoice',
            message: "Who is the employee's Manager?",
            choices: managerChoiceArr
        }
    ]);
    const managerId = managerChoice;

    //pass in first, last, roleChoice, & managerChoice into query to create new emp in db
    await query.newEmployee(first, last, roleChoice, managerChoice);
    console.log('Successfully added New Employee!');
    //render selection menu 
    renderPrompts();

}

//update employee role
async function updateEmpRole() {

    //grab all emp to build choice list for which emp will have their role updated
    const updateEmp = await query.findAllEmp();
    const empChoiceArr = updateEmp.map(({ id, first_name, last_name }) => {
        const employee = {
            name: `${first_name} ${last_name}`,
            value: id
        };
        return employee;
    });
    //grab all roles to buil choice list for new role assignment
    const empRoles = await query.findAllRoles();
    const empRolesArr = empRoles.map(({ id, title }) => {
        const role = {
            name: title,
            value: id
        };
        return role;
    });


// grab user choices to pass into db query
    const {empChoice, roleChoice} = await prompt([
        {
            type: 'list',
            name: 'empChoice',
            message: "Which employee's role would you like to update?",
            choices: empChoiceArr
        },
        {
            type: 'list',
            name: 'roleChoice',
            message: "Whichrole do you want to assign the selected employee?",
            choices: empRolesArr
        }

    ]);

    //pass values to query to change in database
    await query.updateEmployeeRole(roleChoice, empChoice);
    console.log("Successfully updated employee role!")
    renderPrompts()


}



//quit function to exit from CLI
function quit() {
    console.log("BYE!")
    //exits node process
    process.exit();
}