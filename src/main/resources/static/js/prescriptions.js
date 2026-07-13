// ==========================================
// Doctor Prescriptions
// ==========================================

const BASE_URL =
window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://hospital-management-system-6pok.onrender.com";

const doctorId = localStorage.getItem("doctorId");

if (!doctorId) {

    alert("Session expired. Please login again.");

    window.location.href = "login.html";

}

const API =
BASE_URL + "/prescriptions/doctor/" + doctorId;

const SAVE_API =
BASE_URL + "/prescriptions";

const PATIENT_API =
BASE_URL + "/patients/doctor/" + doctorId;

let prescriptions = [];

let deleteId = null;

// =========================
// Page Load
// =========================

window.onload = function () {

    loadPatients();

    loadPrescriptions();

    document
        .getElementById("searchPrescription")
        .addEventListener("keyup", searchPrescription);

};

// =========================
// Load Prescriptions
// =========================

async function loadPrescriptions() {

    try {

        const response = await fetch(API);

        if (!response.ok) {

            throw new Error("Unable to load prescriptions.");

        }

        prescriptions = await response.json();

        displayPrescriptions(prescriptions);

        updateCards(prescriptions);

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// =========================
// Display
// =========================

function displayPrescriptions(list) {

    let rows = "";

    list.forEach(p => {

        rows += `

        <tr>

            <td>${p.id}</td>

            <td>${p.patient ? p.patient.name : "-"}</td>

            <td>${p.medicine}</td>

            <td>${p.notes}</td>

            <td>

                <button class="editBtn"
                    onclick="editPrescription(${p.id})">

                    <i class="fas fa-edit"></i>

                </button>

                <button class="deleteBtn"
                    onclick="deletePrescription(${p.id})">

                    <i class="fas fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("prescriptionTable").innerHTML =
        rows;

}

// =========================
// Dashboard Cards
// =========================

function updateCards(list) {

    document.getElementById("prescriptionCount").innerHTML =
        list.length;

    const patients = new Set();

    list.forEach(p => {

        if (p.patient) {

            patients.add(p.patient.id);

        }

    });

    document.getElementById("patientCount").innerHTML =
        patients.size;

    document.getElementById("todayCount").innerHTML =
        list.length;

    document.getElementById("medicineCount").innerHTML =
        list.length;

}

// =========================
// Load Patients
// =========================

async function loadPatients() {

    try {

        const response = await fetch(PATIENT_API);

        if (!response.ok) {

            throw new Error("Unable to load patients.");

        }

        const patients = await response.json();

        const select =
            document.getElementById("patientSelect");

        select.innerHTML =
            "<option value=''>Select Patient</option>";

        patients.forEach(patient => {

            select.innerHTML +=

            `<option value="${patient.id}">
                ${patient.name}
            </option>`;

        });

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// =========================
// Search
// =========================

function searchPrescription() {

    const keyword =

        document
        .getElementById("searchPrescription")
        .value
        .toLowerCase();

    const filtered =

        prescriptions.filter(p =>

            (p.medicine || "")
            .toLowerCase()
            .includes(keyword)

            ||

            (p.notes || "")
            .toLowerCase()
            .includes(keyword)

            ||

            (p.patient?.name || "")
            .toLowerCase()
            .includes(keyword)

        );

    displayPrescriptions(filtered);

}

// =========================
// Open Modal
// =========================

function openPrescriptionModal() {

    document.getElementById("modalTitle").innerHTML =
        "New Prescription";

    document.getElementById("prescriptionId").value = "";

    document.getElementById("patientSelect").value = "";

    document.getElementById("medicine").value = "";

    document.getElementById("instructions").value = "";

    document.getElementById("prescriptionModal").style.display =
        "block";

}

function closePrescriptionModal() {

    document.getElementById("prescriptionModal").style.display =
        "none";

}

// =========================
// Save
// =========================

async function savePrescription() {

    const id =
        document.getElementById("prescriptionId").value;

    const prescription = {

        medicine:
            document.getElementById("medicine").value.trim(),

        notes:
            document.getElementById("instructions").value.trim(),

        doctor: {

            id: doctorId

        },

        patient: {

            id:
                document.getElementById("patientSelect").value

        }

    };

    if (

        !prescription.medicine ||

        !prescription.notes ||

        !prescription.patient.id

    ) {

        alert("Please fill all fields.");

        return;

    }

    const url =
        id ? SAVE_API + "/" + id : SAVE_API;

    const method =
        id ? "PUT" : "POST";

    try {

        const response = await fetch(url, {

            method: method,

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(prescription)

        });

        if (!response.ok) {

            throw new Error("Unable to save prescription.");

        }

        closePrescriptionModal();

        loadPrescriptions();

        alert("Prescription saved successfully.");

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}
// =========================
// Edit Prescription
// =========================

function editPrescription(id) {

    const p = prescriptions.find(x => x.id == id);

    if (!p) {

        alert("Prescription not found.");

        return;

    }

    document.getElementById("modalTitle").innerHTML =
        "Edit Prescription";

    document.getElementById("prescriptionId").value =
        p.id;

    document.getElementById("patientSelect").value =
        p.patient ? p.patient.id : "";

    document.getElementById("medicine").value =
        p.medicine || "";

    document.getElementById("instructions").value =
        p.notes || "";

    document.getElementById("prescriptionModal").style.display =
        "block";

}

// =========================
// Delete Prescription
// =========================

function deletePrescription(id) {

    deleteId = id;

    document.getElementById("deleteModal").style.display =
        "block";

}

// =========================
// Close Delete Modal
// =========================

function closeDeleteModal() {

    document.getElementById("deleteModal").style.display =
        "none";

}

// =========================
// Confirm Delete
// =========================

async function confirmDelete() {

    try {

        const response = await fetch(

            SAVE_API + "/" + deleteId,

            {

                method: "DELETE"

            }

        );

        if (!response.ok) {

            throw new Error("Unable to delete prescription.");

        }

        closeDeleteModal();

        loadPrescriptions();

        alert("Prescription deleted successfully.");

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}