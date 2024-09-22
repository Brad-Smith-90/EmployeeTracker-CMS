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

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

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
     `touch .env`
     ```
    
    Add your PostgreSQL credentials in the `.env` file:

     ```bash
     DB_USER=your-username
     DB_PASSWORD=your-password
     DB_HOST=localhost
     DB_PORT=5433  # Change to your PostgreSQL port
     DB_NAME=employee_db
     ```
