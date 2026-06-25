Employee Directory - API Driven Version
Overview

Employee Directory is a responsive web application developed using HTML, CSS, and JavaScript. The application allows users to browse employee information, search employees by name or role, filter employees by department, and view detailed employee information.

The project was enhanced from a static employee directory into an API-driven application by fetching employee data from an external API.

Features Implemented
Employee Listing
Employee data is fetched from an external API.
Employee cards are generated dynamically using JavaScript.
Displays employee name, ID, role, department, email, phone number, age, and address.
Employee status indicators and avatar colors are displayed.
Search Functionality
Search employees by name.
Search employees by role.
Department Filter
Filter employees by department.
Departments are assigned dynamically.
Employee Details Modal
Clicking an employee card opens a detailed information popup.
Displays additional employee details.
Add Employee
Add new employees using a modal form.
Newly added employees appear immediately in the directory.
Loading State
Displays a loading message while employee data is being fetched.
Error Handling
Displays a user-friendly error message if the API request fails.
Responsive Design
Fully responsive layout for desktop, tablet, and mobile devices.
Modular JavaScript
API-related code is separated into a service file.
Uses ES6 modules with import and export.
Technologies Used
HTML5
CSS3
JavaScript (ES6)
Fetch API
Font Awesome Icons
DummyJSON API
JavaScript Concepts Used
Synchronous vs Asynchronous JavaScript
Callbacks
setTimeout()
Event Loop (High Level)
Promises
then()
catch()
finally()
async and await
try-catch error handling
Fetch API
JSON handling
DOM Manipulation
Event Handling
API Used

Employee data is fetched from:

https://dummyjson.com/users

Project Structure
Employee-Directory/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
├── screenshots/
│     ├── employee-listing.png
│     ├── employee-details.png
│     └── add-employee.png
│
└── services/
      └── employeeService.js

      
