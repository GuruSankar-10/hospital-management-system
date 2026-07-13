// ==========================================
// Doctor Patients
// ==========================================

// API URL
const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

const API_URL = isLocal
    ? "http://localhost:8080"
    : "https://hospital-management-system-6pok.onrender.com";

const doctorId = localStorage.getItem("doctorId");
if (!doctorId) {
    alert("Session expired. Please login again.");
    window.location.href = "login.html";
}
let patients = [];

// ==========================================
// Page Load
// ==========================================

window.onload = function () {

    loadPatients();

    document
        .getElementById("searchPatient")
        .addEventListener("keyup", searchPatient);

};

// ==========================================
// Load Patients
// ==========================================

async function loadPatients() {

    try {

        const response = await fetch(
            API_URL + "/patients/doctor/" + doctorId,
            {
                headers: {
                    "Authorization":
                        "Bearer " + localStorage.getItem("token")
                }
            }
        );

        if (!response.ok) {

            throw new Error("Unable to load patients.");

        }

        patients = await response.json();

        displayPatients(patients);

        updateCards(patients);

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Display Patients
// ==========================================

function displayPatients(list) {

    let rows = "";

    list.forEach(patient => {

        rows += `

<tr>

<td>${patient.id}</td>

<td>${patient.name}</td>

<td>${patient.age}</td>

<td>${patient.disease}</td>

<td>${patient.phone}</td>

<td>

<button
class="view-btn"
onclick="viewPatient(${patient.id})">

<i class="fas fa-eye"></i>

</button>

</td>

<td>

<button
class="record-btn"
onclick="openMedicalRecord(${patient.id})">

<i class="fas fa-notes-medical"></i>

</button>

</td>

<td>

<button
class="prescription-btn"
onclick="openPrescription(${patient.id})">

<i class="fas fa-file-prescription"></i>

</button>

</td>

<td>

<button
class="edit-btn"
onclick="editPatient(${patient.id})">

<i class="fas fa-pen"></i>

</button>

</td>

<td>

<button
class="delete-btn"
onclick="deletePatient(${patient.id})">

<i class="fas fa-trash"></i>

</button>

</td>

</tr>

`;

    });

    document.getElementById("patientTable").innerHTML = rows;

}

// ==========================================
// Dashboard Cards
// ==========================================

function updateCards(list) {

    document.getElementById("patientCount").innerHTML =
        list.length;

    let fever = 0;

    let other = 0;

    list.forEach(patient => {

        if (

            patient.disease &&
            patient.disease.toLowerCase().includes("fever")

        ) {

            fever++;

        }

        else {

            other++;

        }

    });

    document.getElementById("feverCount").innerHTML =
        fever;

    document.getElementById("otherCount").innerHTML =
        other;

    document.getElementById("todayCount").innerHTML =
        list.length;

}

// ==========================================
// Search
// ==========================================

function searchPatient() {

    const keyword =

        document
        .getElementById("searchPatient")
        .value
        .toLowerCase();

    const filtered = patients.filter(patient =>

		(patient.name || "").toLowerCase().includes(keyword)

		||

		(patient.disease || "").toLowerCase().includes(keyword)

		||

		(patient.phone || "").toLowerCase().includes(keyword)

    );

    displayPatients(filtered);

}

// ==========================================
// View Patient
// ==========================================

function viewPatient(id) {

    const patient = patients.find(p => p.id == id);

    if (!patient) return;

    document.getElementById("detailName").innerHTML =
        patient.name;

    document.getElementById("detailAge").innerHTML =
        patient.age;

    document.getElementById("detailDisease").innerHTML =
        patient.disease;

    document.getElementById("detailPhone").innerHTML =
        patient.phone;

    document.getElementById("detailStaff").innerHTML =
        patient.staff ? patient.staff.name : "-";

    document.getElementById("patientModal").style.display =
        "block";

}

// ==========================================
// Close Modal
// ==========================================

function closePatientModal() {

    document.getElementById("patientModal").style.display =
        "none";

}

// ==========================================
// Medical Record
// ==========================================

function openMedicalRecord(patientId) {

    localStorage.setItem("patientId", patientId);

    window.location.href =
        "doctor-medical-records.html";

}

// ==========================================
// Prescription
// ==========================================

function openPrescription(patientId) {

    localStorage.setItem("patientId", patientId);

    window.location.href =
        "doctor-prescriptions.html";

}

// ==========================================
// Edit Patient
// ==========================================

function editPatient(patientId) {

    localStorage.setItem("editPatientId", patientId);

    alert("Edit Patient module will be added next.");

}

// ==========================================
// Delete Patient
// ==========================================

async function deletePatient(patientId) {

    if (!confirm("Delete this patient?")) {

        return;

    }

    try {

        const response = await fetch(

            API_URL + "/patients/" + patientId,

            {
                method: "DELETE",

                headers: {

                    "Authorization":
                        "Bearer " + localStorage.getItem("token")

                }

            }

        );

        if (!response.ok) {

            throw new Error("Unable to delete patient.");

        }

        alert("Patient Deleted Successfully");

        loadPatients();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}