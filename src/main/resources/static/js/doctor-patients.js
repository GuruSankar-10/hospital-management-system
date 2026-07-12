const doctorId = localStorage.getItem("doctorId");

const API =
"http://localhost:8080/patients/doctor/" + doctorId;

let patients = [];

// ===============================
// Page Load
// ===============================

window.onload = function () {

    loadPatients();

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

        patients = await response.json();

        displayPatients(patients);

        updateCards(patients);

    }

    catch (error) {

        console.error(error);

    }

}

// ===============================
// Display Patients
// ===============================

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
                    class="btn"
                    onclick="viewPatient(${patient.id})">

                    <i class="fas fa-eye"></i>

                    View

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("patientTable").innerHTML = rows;

}

// ===============================
// Dashboard Cards
// ===============================

function updateCards(list) {

    document.getElementById("patientCount").innerHTML =
        list.length;

    let fever = 0;

    let other = 0;

    list.forEach(patient => {

        if (

            patient.disease &&
            patient.disease.toLowerCase().includes("fever")

        )

            fever++;

        else

            other++;

    });

    document.getElementById("feverCount").innerHTML =
        fever;

    document.getElementById("otherCount").innerHTML =
        other;

    document.getElementById("todayCount").innerHTML =
        list.length;

}

// ===============================
// Search
// ===============================

function searchPatient() {

    const keyword =
        document
        .getElementById("searchPatient")
        .value
        .toLowerCase();

    const filtered = patients.filter(patient =>

        patient.name.toLowerCase().includes(keyword)

        ||

        patient.disease.toLowerCase().includes(keyword)

        ||

        patient.phone.toLowerCase().includes(keyword)

    );

    displayPatients(filtered);

}

// ===============================
// View Patient
// ===============================

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

// ===============================
// Close Modal
// ===============================

function closePatientModal() {

    document.getElementById("patientModal").style.display =
        "none";

}