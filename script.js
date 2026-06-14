let employees = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    role: "HR Specialist",
    department: "HR",
    email: "sarah@xyz.com",
    status: "Available",
    color: "#a78bfa"
  },
  {
    id: "EMP002",
    name: "Michael Carter",
    role: "Finance Manager",
    department: "Sales",
    email: "michael@xyz.com",
    status: "Busy",
    color: "#60a5fa"
  },
  {
    id: "EMP003",
    name: "Emma Wilson",
    role: "Marketing Executive",
    department: "Marketing",
    email: "emma@xyz.com",
    status: "On Call",
    color: "#34d399"
  },
  {
    id: "EMP004",
    name: "Daniel Brown",
    role: "IT Engineer",
    department: "Engineering",
    email: "daniel@xyz.com",
    status: "Available",
    color: "#fb923c"
  },
  {
    id: "EMP005",
    name: "Olivia Martin",
    role: "UI Designer",
    department: "Design",
    email: "olivia@xyz.com",
    status: "Offline",
    color: "#f472b6"
  },
  {
    id: "EMP006",
    name: "James Anderson",
    role: "Operations Lead",
    department: "HR",
    email: "james@xyz.com",
    status: "Busy",
    color: "#14b8a6"
  }
];

const grid = document.getElementById("employeeGrid");
const search = document.getElementById("search");
const departmentFilter = document.getElementById("departmentFilter");
const noResults = document.getElementById("noResults");

const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const closeBtn = document.getElementById("closeBtn");
const cancelBtn = document.getElementById("cancelBtn");
const form = document.getElementById("employeeForm");

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
      </div>
    `;

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

addBtn.addEventListener("click", function () {
  modal.classList.add("show");
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("show");
});

cancelBtn.addEventListener("click", function () {
  modal.classList.remove("show");
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
    status: document.getElementById("status").value,
    color: document.getElementById("color").value
  };

  employees.push(newEmployee);

  form.reset();
  modal.classList.remove("show");
  filterEmployees();
});

showEmployees(employees);
