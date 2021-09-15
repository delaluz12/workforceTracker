//object deconstruction to not have to type inquirer.prompt
const { prompt } = require('inquirer');
const query = require('./mydatabase/query');
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
            message: 'What would you lile to do?',
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
    console.log(choice);

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
    await query.newDept(newDeptName);

    renderPrompts();

}

function quit(){
    console.log("BYE!")
    process.exit();
}