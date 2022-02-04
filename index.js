// import packages
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const PORT = 3001;
const app = express();
const consoletable = require("console.table");

// create connection to db

const db = mysql.createConnection({
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);


const startApp = () => {
  // prompt user
  inquirer
    .prompt([{
      type: "list",
      name: "promptOption",
      message: "What do you want to do ?",
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee","update an employee role"]
    }, ])
    .then(answers => {
      // print user choice
     
      if (answers.promptOption === "view all departments") {

        viewAllDepartment();
      } else if (answers.promptOption === "view all roles") {
        viewAllRoles();

      } else if (answers.promptOption === "view all employees") {
        viewAllEmployee();

      } else if (answers.promptOption === "add a department") {
        addDepartment();

      } else if (answers.promptOption === "add a role") {
        addARole();

      } else if (answers.promptOption === "add an employee") {
        addAnEmployee();

      } else if (answers.promptOption === "update an employee role") {
        UpdateAnEmployee();

      }
    });
}


const viewAllDepartment = () => {

  // get department from db
  db.query("SELECT * FROM department", function (err, results) {
   
    const choices = results.map((department) => ({
      Department_ID: `${department.id}`,
      Department_Name: `${department.dept_name}`,


    }));

    console.table(choices);
    startApp();

  });

  
}
const viewAllRoles = () => {
  
  const query = `SELECT *,table_role.id  from table_role
                 JOIN department
                 ON table_role.department_id = department.id;`
  db.query(query, function (err, results) {
    const role = results.map((role) => ({
      Role_ID: `${role.id}`,
      Roles: `${role.dept_name}`,
      Department: `${role.title}`,
      Department_Id: `${role.department_id}`,
      Salary: `${role.Salary}`,

    }));

    console.table(results);
    startApp();
  });

  
}
const viewAllEmployee = () => {
 
  const query = `select  employee.id, employee.first_name, employee.last_name, dept_name, title, salary, employee.manager_id, manager.first_name AS 'manager_name'
  from employee
  LEFT JOIN employee manager on employee.manager_id = manager.id
  LEFT JOIN table_role on table_role.id = employee.role_id
  LEFT JOIN department ON table_role.department_id = department.id;`

  db.query(query, function (err, results) {
    //console.log(results); 
    const role = results.map((query) => ({
      Employee_ID: `${query.id}`, 
      Employee_Name: `${query.first_name}`,
      Employee_LastName: ` ${query.last_name}`,
      Department: `${query.dept_name}`,
      Job_Title: `${query.title}`,
      Salary: `${query.salary}`,
      Report_Manager: `${query.manager_name} `


    }));

    console.table(results);
    startApp();
  });

  

}
const addDepartment = () => {

  inquirer
    .prompt([{
      type: "input",
      name: "addDepartment",
      message: "Please enter the name of the department you want to add."
    }])
    .then((answer) => {
      db.query(`INSERT INTO department(dept_name) VALUES ("${answer.addDepartment}")`)
      db.query(`SELECT * from department`, function (err, results) {
      
        console.table(results);
        startApp();
      });
      
    })
  
  
}
const addARole = () => {

  inquirer
    .prompt([{
        type: "input",
        name: "addNewRoles",
        message: "Please enter the name of the role you want to add."
      },
      {
        type: "input",
        name: "newSalary",
        message: "Please enter salary for that role"
      },
      {
        type: "input",
        name: "newDepartment",
        message: "Please enter the department ID you want to add for role"
      }
    ])
    .then((answer) => {
      db.query(`INSERT INTO table_role( title , Salary, department_id) VALUES ("${answer.addNewRoles}","${answer.newSalary}","${answer.newDepartment}" )`)
      db.query(`SELECT * from table_role`, function (err, results) {
      
        console.table(results);
        startApp();
      });
      

    })


}
const addAnEmployee = () => {
 
  inquirer
  .prompt([{
      type: "input",
      name: "newEmployeeFirstName",
      message: "Please enter the first name of the employee you want to add."
    },
    {
      type: "input",
      name: "newEmployeeLastName",
      message: "Please enter the last name of the employee you want to add"
    },
    {
      type: "input",
      name: "newEmployeeRole",
      message: "Please enter the role of the employee"
    },
    {
      type: "input",
      name: "newEmpReportingManager",
      message: "Please enter the reporting manager ID of this employee"
    }
  ])
  .then((answer) => {
    db.query(`INSERT INTO employee(id, first_name, last_name, role_id,manager_id) VALUES ("${answer.newEmployeeFirstName}","${answer.newEmployeeLastName}","${answer.newEmployeeRole}" ,"${answer.newEmpReportingManager}")`)
    db.query(`SELECT * from employee`, function (err, results) {
      
      console.table(results);
      startApp();
    });
   
  })
  

}
const UpdateAnEmployee = () => {
  console.log("UPDATE AN EMPLOYEE");

}


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startApp();
});