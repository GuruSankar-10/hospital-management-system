console.log("Staff Patient JS Loaded");

// ==========================================
// Base URL
// ==========================================

const BASE_URL =
window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://hospital-management-system-6pok.onrender.com";

const PATIENT_API = BASE_URL + "/patients";

let patientsData = [];

// ==============================
// Page Load
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    loadPatients();

});

// ==============================
// Load Patients
// ==============================

function loadPatients() {

    fetch(PATIENT_API)

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load patients.");

        }

        return response.json();

    })

    .then(data => {

        patientsData = data;

        displayPatients(data);

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}

// ==============================
// Display Patients
// ==============================

function displayPatients(data) {

    let rows = "";

    data.forEach(patient => {

        rows += `

        <tr>

            <td>${patient.id}</td>

            <td>${patient.name || "-"}</td>

            <td>${patient.age || "-"}</td>

            <td>${patient.disease || "-"}</td>

            <td>${patient.phone || "-"}</td>

            <td>

                ${patient.doctor ? patient.doctor.name : "Not Assigned"}

            </td>

        </tr>

        `;

    });

    document.getElementById("patientTable").innerHTML = rows;

}

// ==============================
// Search Patients
// ==============================

function searchPatients() {

    const searchValue =

        document
        .getElementById("searchPatient")
        .value
        .toLowerCase();

    const filtered = patientsData.filter(patient => {

        return (

            (patient.name || "")
                .toLowerCase()
                .includes(searchValue)

            ||

            (patient.disease || "")
                .toLowerCase()
                .includes(searchValue)

            ||

            (patient.phone || "")
                .toLowerCase()
                .includes(searchValue)

        );

    });

    displayPatients(filtered);

}