
const token = localStorage.getItem("token");

const API_URL = "http://localhost:5000/api/employees";

// INPUT REFERENCES (IMPORTANT FIX)
const empIdInput = document.getElementById("empId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const departmentInput = document.getElementById("department");

/* =========================
   FETCH ALL EMPLOYEES
========================= */
async function fetchEmployees() {
  try {
    const res = await fetch(API_URL);
    const employees = await res.json();

    const list = document.getElementById("employeeList");
    list.innerHTML = "";

    if (!Array.isArray(employees)) return;

    employees.forEach(emp => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span>${emp.name} - ${emp.department}</span>
        <div class="actions">
          <button class="edit" onclick='editEmployee(${JSON.stringify(emp)})'>
            Edit
          </button>
          <button class="delete" onclick="deleteEmployee('${emp._id}')">
            Delete
          </button>
        </div>
      `;

      list.appendChild(li);
    });
  } catch (err) {
    console.error("Fetch failed", err);
  }
}

/* =========================
   CREATE OR UPDATE
========================= */
async function saveEmployee() {
  const id = empIdInput.value;

  const employee = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    department: departmentInput.value.trim(),
  };

  if (!employee.name || !employee.email) {
    alert("Name and Email are required");
    return;
  }

  try {
    if (id) {
      // UPDATE
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
    } else {
      // CREATE
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
    }

    clearForm();
    fetchEmployees();
  } catch (err) {
    console.error("Save failed", err);
  }
}

/* =========================
   DELETE
========================= */
async function deleteEmployee(id) {
  if (!confirm("Delete this employee?")) return;

  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchEmployees();
}

/* =========================
   EDIT
========================= */
function editEmployee(emp) {
  empIdInput.value = emp._id;
  nameInput.value = emp.name;
  emailInput.value = emp.email;
  phoneInput.value = emp.phone;
  departmentInput.value = emp.department;
}

/* =========================
   CLEAR FORM
========================= */
function clearForm() {
  empIdInput.value = "";
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  departmentInput.value = "";
}

/* =========================
   INIT
========================= */
fetchEmployees();
