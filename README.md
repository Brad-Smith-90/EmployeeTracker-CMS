# Employee Tracker CMS

## Description

The **Employee Tracker CMS** is a command-line application designed to manage a company's employee database. It provides business owners with a way to view and manage departments, roles, and employees. Built using **Node.js**, **Inquirer**, and **PostgreSQL**, this system enables users to organize and plan their workforce more effectively by interacting with employee data directly through the terminal.

The application allows users to:
- View all departments, roles, and employees.
- Add new departments, roles, and employees.
- Update employee roles.
- View employee managers.

This project adheres to a modular and scalable structure, utilizing a PostgreSQL database to store information and Inquirer.js for the user interface.

## Table of Contents
- [Demo](#Demo)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)


## Demo

[![Watch the demo on YouTube](https://img.youtube.com/vi/9nLBT9foTM/0.jpg)](https://www.youtube.com/watch?v=_9nLBT9foTM)



## Installation

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/yourusername/employee-tracker-cms.git
   cd employee-tracker-cms
   ```

2. **Install dependencies:** Ensure you have [Node.js](https://nodejs.org) installed, then run:

   ```bash
   npm install
   ```

3. **Set up the database:**
      * Install [PostgreSQL](https://www.postgresql.org/) if you don't have it already.
  
      * Create a PostgreSQL database named `employee_db`:

        ```bash
        psql -U postgres
        CREATE DATABASE employee_db;
        \q
        ```
4. **Run the database schema** to create the necessary tables:

     ```bash
     psql -U postgres -d employee_db -f schema.sql
     ```

5. **Optionally seed the database** with sample data:

     ```bash
     psql -U postgres -d employee_db -f seeds.sql
     ```

6. **Create a `.env` file** in the root of your project:

     ```bash
     touch .env
     ```
    
    Add your PostgreSQL credentials in the `.env` file:

     ```bash
     DB_USER=your-username
     DB_PASSWORD=your-password
     DB_HOST=localhost
     DB_PORT=5433  # Change to your PostgreSQL port
     DB_NAME=employee_db
     ```
    - **Note:** **Do NOT** push your `.env` file or any other file that contains sensitive data such as usernames, passwords, IP address, etc... to your GitHub Repository! Ensure the file(s) are included in your `.gitignore` !

## Usage


   1. Run the application:

      ``` bash
      node index.js
      ```

   2. **Main menu options:**

        * View all departments
     
        * View all roles
     
        * View all employees
     
        * Add a department
     
        * Add a role
     
        * Add an employee
     
        * Update an employee role
     
        * Exit

   3. **Example Interaction:**

       * Upon selecting "View all departments," a table of all department names and IDs will be displayed.
     
       * When adding an employee, the system will prompt you for the employee’s first name, last name, role, and manager.
     

## Features


   * **View departments, roles, and employees:** Fetch and display all departments, roles (with salary and department), and employees (with role, department, and manager).

   * **Add departments, roles, and employees:** Prompt the user to input data for new departments, roles, and employees and insert it into the database.

   * **Update employee roles:** Select an employee and update their role.

   * **View employee managers:** Display the names of the managers for each employee.


## Technologies


   * **Node.js:** JavaScript runtime for executing server-side code.

   * **Inquirer.js:** Command-line interface for interactive user prompts.

   * **PostgreSQL:** SQL-based relational database for data storage.

   * **pg:** PostgreSQL client for Node.js.


## License


   This project is licensed under the MIT License. See the LICENSE file for more details.


## Contributing


   If you wish to contribute to this project, please follow these steps:

   1. **Fork the repository**

   2. **Create a new branch** for your feature or bug fix:

       ```
       git checkout -b feature/new-feature
       ```

   3. **Commit your changes:**

        ```
        git commit -m "Add feature XYZ"
        ```

   4. **Push to the branch:

       ```
       git push origin feature/new-feature
       ```

   5. **Submit a pull request**

All contributions are welcome and appreciated.


## Questions

   If you have any questions or suggestions, feel free to reach out to me at [B.Smith6090@gmail.com](mailto:B.Smith6090@gmail.com)
.
   You can also find more of my work on GitHub: [Brad-Smith-90](https://github.com/Brad-Smith-90)


    
    

   
