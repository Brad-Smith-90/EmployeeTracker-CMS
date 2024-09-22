const inquirer = require('inquirer');
const pool = require('./db'); // Database connection

async function mainMenu() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);

    switch(action) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Goodbye!');
            pool.end(); // Close database connection
            process.exit();
            break;
    }
}

// View all departments
async function viewDepartments() {
    try {
        const res = await pool.query('SELECT * FROM department');
        console.log('\n'); // Add a new line before displaying results
        if (res.rows.length > 0) {
            console.table(res.rows);
        } else {
            console.log("No departments found.");
        }
    } catch (err) {
        console.error('Error executing department query:', err);
    }
    await pauseAndReturnToMain();
}

// View all roles
async function viewRoles() {
    try {
        const res = await pool.query(`
            SELECT role.id, role.title, department.name AS department, role.salary 
            FROM role 
            JOIN department ON role.department_id = department.id
        `);
        console.log('\n'); // Add a new line before displaying results
        if (res.rows.length > 0) {
            console.table(res.rows);
        } else {
            console.log("No roles found.");
        }
    } catch (err) {
        console.error('Error executing role query:', err);
    }
    await pauseAndReturnToMain();
}

async function viewEmployees() {
    try {
        const res = await pool.query(`
            SELECT 
                e.id, 
                e.first_name, 
                e.last_name, 
                role.title, 
                department.name AS department, 
                role.salary, 
                CASE 
                    WHEN m.first_name IS NOT NULL THEN CONCAT(m.first_name, ' ', m.last_name) 
                    ELSE 'No Manager' 
                END AS manager 
            FROM employee e
            JOIN role ON e.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee m ON e.manager_id = m.id
        `);

        console.log('\n'); // Add a new line before displaying results
        if (res.rows.length > 0) {
            console.table(res.rows);
        } else {
            console.log("No employees found.");
        }
    } catch (err) {
        console.error('Error executing employee query:', err);
    }
    await pauseAndReturnToMain();
}

// Add a department
async function addDepartment() {
    try {
        const { name } = await inquirer.prompt([
            { type: 'input', name: 'name', message: 'Enter department name:' }
        ]);
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(`Added department: ${name}`);
    } catch (err) {
        console.error('Error adding department:', err);
    }
    await pauseAndReturnToMain();
}

// Add a role
async function addRole() {
    try {
        const departments = await pool.query('SELECT * FROM department');
        const departmentChoices = departments.rows.map(dept => ({ name: dept.name, value: dept.id }));

        const { title, salary, department_id } = await inquirer.prompt([
            { type: 'input', name: 'title', message: 'Enter role title:' },
            { type: 'input', name: 'salary', message: 'Enter role salary:' },
            {
                type: 'list',
                name: 'department_id',
                message: 'Choose a department:',
                choices: departmentChoices
            }
        ]);

        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
        console.log(`Added role: ${title}`);
    } catch (err) {
        console.error('Error adding role:', err);
    }
    await pauseAndReturnToMain();
}

// Add an employee
async function addEmployee() {
    try {
        const roles = await pool.query('SELECT * FROM role');
        const roleChoices = roles.rows.map(role => ({ name: role.title, value: role.id }));

        const employees = await pool.query('SELECT * FROM employee');
        const managerChoices = employees.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
        managerChoices.unshift({ name: 'None', value: null });

        const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
            { type: 'input', name: 'first_name', message: 'Enter employee first name:' },
            { type: 'input', name: 'last_name', message: 'Enter employee last name:' },
            {
                type: 'list',
                name: 'role_id',
                message: 'Choose a role:',
                choices: roleChoices
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Choose a manager:',
                choices: managerChoices
            }
        ]);

        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
        console.log(`Added employee: ${first_name} ${last_name}`);
    } catch (err) {
        console.error('Error adding employee:', err);
    }
    await pauseAndReturnToMain();
}

// Update employee role
async function updateEmployeeRole() {
    try {
        const employees = await pool.query('SELECT * FROM employee');
        const employeeChoices = employees.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

        const roles = await pool.query('SELECT * FROM role');
        const roleChoices = roles.rows.map(role => ({ name: role.title, value: role.id }));

        const { employee_id, role_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Choose an employee to update:',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Choose a new role:',
                choices: roleChoices
            }
        ]);

        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
        console.log('Updated employee role');
    } catch (err) {
        console.error('Error updating employee role:', err);
    }
    await pauseAndReturnToMain();
}

// Function to pause and then return to main menu
async function pauseAndReturnToMain() {
    console.log('\nPress Enter to return to the main menu...');
    await inquirer.prompt([{ type: 'input', name: 'pause' }]);
    mainMenu();
}

// Start the application
mainMenu();
