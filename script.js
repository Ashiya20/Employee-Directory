import { getEmployeesFromAPI } from "./employeeService.js";

let employees = [];

const grid = document.getElementById("employeeGrid");
const search = document.getElementById("search");
const departmentFilter = document.getElementById("departmentFilter");
const noResults = document.getElementById("noResults");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const closeBtn = document.getElementById("closeBtn");
const cancelBtn = document.getElementById("cancelBtn");
const form = document.getElementById("employeeForm");

const detailsModal = document.getElementById("detailsModal");
const detailsCloseBtn = document.getElementById("detailsCloseBtn");
const employeeDetails = document.getElementById("employeeDetails");

const departments = ["Engineering", "Design", "Marketing", "Sales", "HR"];
const statuses = ["Available", "Busy", "On Call", "Offline"];
const colors = ["#a78bfa", "#60a5fa", "#34d399", "#fb923c", "#f472b6", "#14b8a6"];

function getInitial(name) {
  return name.charAt(0).toUpperCase();
}

function getStatusColor(status) {
  if (status === "Available") return "#22c55e";
  if (status === "Busy") return "#ef4444";
  if (status === "On Call") return "#3b82f6";
  return "#64748b";
}

function createEmployeeId() {
  return "EMP" + String(employees.length + 1).padStart(3, "0");
}

function showLoading() {
  loadingMessage.style.display = "block";
  errorMessage.style.display = "none";
  noResults.style.display = "none";
  grid.innerHTML = "";
}

function hideLoading() {
  loadingMessage.style.display = "none";
}

function showError() {
  errorMessage.style.display = "block";
  loadingMessage.style.display = "none";
}

function showEmployees(employeeList) {
  grid.innerHTML = "";

  if (employeeList.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  employeeList.forEach(employee => {
    const card = document.createElement("div");
    const statusColor = getStatusColor(employee.status);

    card.className = "employee-card";

    card.innerHTML = `
      <div class="profile-area">
        <div class="avatar-box">
          <div class="avatar" style="background:${employee.color}">
            ${getInitial(employee.name)}
          </div>

          <span class="status-dot" style="background:${statusColor}"></span>
        </div>
      </div>

      <div class="employee-info">
        <div class="status-badge" style="background:${statusColor}22; color:${statusColor}">
          ${employee.status}
        </div>

        <h3>${employee.name}</h3>

        <p class="employee-id">${employee.id}</p>

        <p><strong>Role:</strong> ${employee.role}</p>
        <p><strong>Department:</strong> ${employee.department}</p>
        <p class="email"><strong>Email:</strong> ${employee.email}</p>
        <p><strong>Phone:</strong> ${employee.phone}</p>
        <p><strong>Age:</strong> ${employee.age}</p>
        <p><strong>Address:</strong> ${employee.address}</p>
      </div>
    `;

    card.addEventListener("click", function () {
      showEmployeeDetails(employee);
    });

    grid.appendChild(card);
  });
}

function filterEmployees() {
  const searchText = search.value.toLowerCase();
  const selectedDepartment = departmentFilter.value;

  const filteredEmployees = employees.filter(employee => {
    const matchSearch =
      employee.name.toLowerCase().includes(searchText) ||
      employee.role.toLowerCase().includes(searchText);

    const matchDepartment =
      selectedDepartment === "" ||
      employee.department === selectedDepartment;

    return matchSearch && matchDepartment;
  });

  showEmployees(filteredEmployees);
}

function showEmployeeDetails(employee) {
  employeeDetails.innerHTML = `
    <p><strong>Name:</strong> ${employee.name}</p>
    <p><strong>Employee ID:</strong> ${employee.id}</p>
    <p><strong>Role:</strong> ${employee.role}</p>
    <p><strong>Department:</strong> ${employee.department}</p>
    <p><strong>Email:</strong> ${employee.email}</p>
    <p><strong>Phone:</strong> ${employee.phone}</p>
    <p><strong>Age:</strong> ${employee.age}</p>
    <p><strong>Address:</strong> ${employee.address}</p>
    <p><strong>Status:</strong> ${employee.status}</p>
  `;

  detailsModal.classList.add("show");
}

async function fetchEmployees() {
  showLoading();

  try {
    const users = await getEmployeesFromAPI();

    employees = users.map((user, index) => {
      return {
        id: "EMP" + String(index + 1).padStart(3, "0"),
        name: user.firstName + " " + user.lastName,
        role: user.company.title,
        department: departments[index % departments.length],
        email: user.email,
        phone: user.phone,
        age: user.age,
        address: user.address.city + ", " + user.address.state,
        status: statuses[index % statuses.length],
        color: colors[index % colors.length]
      };
    });

    showEmployees(employees);
  } catch (error) {
    console.log(error);
    showError();
  } finally {
    hideLoading();
  }
}

addBtn.addEventListener("click", function () {
  modal.classList.add("show");
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("show");
});

cancelBtn.addEventListener("click", function () {
  modal.classList.remove("show");
});

detailsCloseBtn.addEventListener("click", function () {
  detailsModal.classList.remove("show");
});

search.addEventListener("input", filterEmployees);
departmentFilter.addEventListener("change", filterEmployees);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const newEmployee = {
    id: createEmployeeId(),
    name: document.getElementById("name").value,
    role: document.getElementById("role").value,
    department: document.getElementById("department").value,
    email: document.getElementById("email").value,
    phone: "Not added",
    age: "Not added",
    address: "Not added",
    status: document.getElementById("status").value,
    color: document.getElementById("color").value
  };

  employees.push(newEmployee);

  form.reset();
  modal.classList.remove("show");
  filterEmployees();
});

fetchEmployees();