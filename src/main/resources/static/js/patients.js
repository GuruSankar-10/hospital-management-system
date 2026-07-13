// ==========================================
// Patients Management
// ==========================================

const BASE_URL =
window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://hospital-management-system-6pok.onrender.com";

const API = BASE_URL + "/patients";
const DOCTOR_API = BASE_URL + "/doctors";
const STAFF_API = BASE_URL + "/staff";

let deletePatientId = null;

// ===============================
// Page Load
// ===============================

window.onload = function () {

    loadPatients();
    loadDoctors();
    loadStaff();

    document
        .getElementById("searchPatient")
        .addEventListener("keyup", searchPatient);

};

// ===============================
// Load Patients
// ===============================

async function loadPatients() {

    try {

        const response = await fetch(API);

        if (!response.ok) {

            throw new Error("Unable to load patients.");

        }

        const patients = await response.json();

        displayPatients(patients);

        updateCards(patients);

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ===============================
// Display Patients
// ===============================

function displayPatients(patients) {

    let rows = "";

    patients.forEach(p => {

        rows += `

        <tr>

            <td>${p.id}</td>

            <td>${p.name}</td>

            <td>${p.age}</td>

            <td>${p.disease}</td>

            <td>${p.phone}</td>

            <td>${p.doctor ? p.doctor.name : "-"}</td>

            <td>${p.staff ? p.staff.name : "-"}</td>

            <td>

                <button class="editBtn"
                    onclick="editPatient(${p.id})">

                    <i class="fa fa-edit"></i>

                </button>

                <button class="deleteBtn"
                    onclick="deletePatient(${p.id})">

                    <i class="fa fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("patientTable").innerHTML = rows;

}

// ===============================
// Statistics
// ===============================

function updateCards(patients) {

    document.getElementById("patientCount").innerHTML =
        patients.length;

    let doctorAssigned = 0;
    let staffAssigned = 0;
    let disease = new Set();

    patients.forEach(p => {

        if (p.doctor) doctorAssigned++;

        if (p.staff) staffAssigned++;

        if (p.disease) disease.add(p.disease);

    });

    document.getElementById("doctorAssigned").innerHTML =
        doctorAssigned;

    document.getElementById("staffAssigned").innerHTML =
        staffAssigned;

    document.getElementById("diseaseCount").innerHTML =
        disease.size;

}

// ===============================
// Load Doctors
// ===============================

async function loadDoctors() {

    try {

        const response = await fetch(DOCTOR_API);

        if (!response.ok) {

            throw new Error("Unable to load doctors.");

        }

        const doctors = await response.json();

        const select =
            document.getElementById("doctorSelect");

        select.innerHTML =
            '<option value="">Select Doctor</option>';

        doctors.forEach(d => {

            select.innerHTML +=
                `<option value="${d.id}">${d.name}</option>`;

        });

    }

    catch (error) {

        console.error(error);

    }

}

// ===============================
// Load Staff
// ===============================

async function loadStaff() {

    try {

        const response = await fetch(STAFF_API);

        if (!response.ok) {

            throw new Error("Unable to load staff.");

        }

        const staff = await response.json();

        const select =
            document.getElementById("staffSelect");

        select.innerHTML =
            '<option value="">Select Staff</option>';

        staff.forEach(s => {

            select.innerHTML +=
                `<option value="${s.id}">${s.name}</option>`;

        });

    }

    catch (error) {

        console.error(error);

    }

}

// ===============================
// Search
// ===============================

async function searchPatient() {

    const keyword =
        document.getElementById("searchPatient")
        .value
        .toLowerCase();

    const response = await fetch(API);

    const patients = await response.json();

    const filtered = patients.filter(p =>

        (p.name || "")
            .toLowerCase()
            .includes(keyword)

        ||

        (p.disease || "")
            .toLowerCase()
            .includes(keyword)

        ||

        (p.phone || "")
            .toLowerCase()
            .includes(keyword)

    );

    displayPatients(filtered);

}

// ===============================
// Open Modal
// ===============================

function openPatientModal() {

    document.getElementById("modalTitle").innerHTML =
        "Add Patient";

    document.getElementById("patientId").value = "";
    document.getElementById("patientName").value = "";
    document.getElementById("patientAge").value = "";
    document.getElementById("patientDisease").value = "";
    document.getElementById("patientPhone").value = "";
    document.getElementById("doctorSelect").value = "";
    document.getElementById("staffSelect").value = "";

    document.getElementById("patientModal").style.display =
        "block";

}

function closePatientModal() {

    document.getElementById("patientModal").style.display =
        "none";

}

// ===============================
// Save Patient
// ===============================

async function savePatient() {

    const id =
        document.getElementById("patientId").value;

    const patient = {

        name:
            document.getElementById("patientName").value.trim(),

        age:
            parseInt(document.getElementById("patientAge").value),

        disease:
            document.getElementById("patientDisease").value.trim(),

        phone:
            document.getElementById("patientPhone").value.trim(),

        doctor: {

            id:
                document.getElementById("doctorSelect").value

        },

        staff: {

            id:
                document.getElementById("staffSelect").value

        }

    };

    if (

        !patient.name ||

        !patient.age ||

        !patient.disease ||

        !patient.phone ||

        !patient.doctor.id ||

        !patient.staff.id

    ) {

        alert("Please fill all fields.");

        return;

    }

    const url =
        id ? API + "/" + id : API;

    const method =
        id ? "PUT" : "POST";

    try {

        const response = await fetch(url, {

            method: method,

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(patient)

        });

        if (!response.ok) {

            throw new Error("Unable to save patient.");

        }

        closePatientModal();

        loadPatients();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}
// ===============================
// Edit Patient
// ===============================

async function editPatient(id) {

    try {

        const response = await fetch(API + "/" + id);

        if (!response.ok) {

            throw new Error("Unable to load patient.");

        }

        const p = await response.json();

        document.getElementById("modalTitle").innerHTML =
            "Edit Patient";

        document.getElementById("patientId").value =
            p.id;

        document.getElementById("patientName").value =
            p.name || "";

        document.getElementById("patientAge").value =
            p.age || "";

        document.getElementById("patientDisease").value =
            p.disease || "";

        document.getElementById("patientPhone").value =
            p.phone || "";

        document.getElementById("doctorSelect").value =
            p.doctor ? p.doctor.id : "";

        document.getElementById("staffSelect").value =
            p.staff ? p.staff.id : "";

        document.getElementById("patientModal").style.display =
            "block";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ===============================
// Delete Patient
// ===============================

function deletePatient(id) {

    deletePatientId = id;

    document.getElementById("deleteModal").style.display =
        "block";

}

// ===============================
// Close Delete Modal
// ===============================

function closeDeleteModal() {

    document.getElementById("deleteModal").style.display =
        "none";

}

// ===============================
// Confirm Delete
// ===============================

async function confirmDelete() {

    try {

        const response = await fetch(

            API + "/" + deletePatientId,

            {

                method: "DELETE"

            }

        );

        if (!response.ok) {

            throw new Error("Unable to delete patient.");

        }

        closeDeleteModal();

        loadPatients();

        alert("Patient deleted successfully.");

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}