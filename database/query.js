const connection = require('./connection');

// constructor class to organize queries
class Query {
    constructor(connection) {
        this.connection = connection;
    };

    //view all dept name and id
    findAllDept() {
        return this.connection.query('SELECT * FROM dept;');
        ;
    };

    //view all roles title, role id, dept id & salary
    findAllRoles() {
        return this.connection.query('SELECT * FROM roles;');
        ;
    }

    //view all employees
    findAllEmp() {
        return this.connection.query('SELECT employee.id, employee.first_name, employee.last_name, roles.title, dept.name AS department, roles.salary, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN dept ON roles.dept_id = dept.id LEFT JOIN employee manager ON employee.manager_id = manager.id;')
    }
    //add dept pass in name only
    newDept(newDept) {
        return this.connection.query('INSERT INTO dept SET name = ?;', newDept);
    }
    //add role pass in title, salary and dept # 
    newRole(title, salary, dept) {
        return this.connection.query(`INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?);`, [title, salary, dept]);
    }
    //add employee pass in first, last, role & manager id #
    newEmployee(first, last, roleId, managerId){
        return this.connection.query(`INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?);`, [first, last, roleId,managerId]);
    }
    //update employee role pass in employeeId, newRoleId
    updateEmployeeRole(newRoleId, employeeId){
        return this.connection.query(`UPDATE employee SET roles_id = ? WHERE id = ?;`,[newRoleId, employeeId]);
    }
}

module.exports = new Query(connection);
