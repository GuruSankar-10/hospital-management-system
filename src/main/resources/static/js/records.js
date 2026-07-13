// ==========================================
// Medical Records
// ==========================================

console.log("Records JS Loaded");

const BASE_URL =
window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://hospital-management-system-6pok.onrender.com";

const RECORD_API = BASE_URL + "/records";

let records = [];

// ==========================
// Page Load
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    loadRecords();

});

// ==========================
// Load Records
// ==========================

function loadRecords() {

    fetch(RECORD_API)

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load records.");

        }

        return response.json();

    })

    .then(data => {

        records = data;

        displayRecords(data);

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}

// ==========================
// Display Records
// ==========================

function displayRecords(data) {

    let rows = "";

    data.forEach(record => {

        rows += `

        <tr>

            <td>${record.id}</td>

            <td>${record.diagnosis || ""}</td>

            <td>${record.doctorNotes || ""}</td>

            <td>${record.testResults || ""}</td>

            <td>${record.recordDate || ""}</td>

            <td>${record.patient ? record.patient.name : "N/A"}</td>

            <td>${record.doctor ? record.doctor.name : "N/A"}</td>

            <td>

                <button
                    class="deleteBtn"
                    onclick="deleteRecord(${record.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("recordTable").innerHTML = rows;

}

// ==========================
// Add Medical Record
// ==========================

function addRecord() {

    let record = {

        diagnosis:
            document.getElementById("diagnosis").value.trim(),

        doctorNotes:
            document.getElementById("doctorNotes").value.trim(),

        testResults:
            document.getElementById("testResults").value.trim(),

        recordDate:
            document.getElementById("recordDate").value,

        patient: {

            id: Number(
                document.getElementById("patientId").value
            )

        },

        doctor: {

            id: Number(
                document.getElementById("doctorId").value
            )

        }

    };

    if (

        !record.diagnosis ||

        !record.patient.id ||

        !record.doctor.id ||

        !record.recordDate

    ) {

        alert("Please fill all required fields.");

        return;

    }

    fetch(RECORD_API, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(record)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to save record.");

        }

        return response.json();

    })

    .then(() => {

        alert("Medical Record Added Successfully");

        clearRecordForm();

        loadRecords();

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}
// ==========================
// Delete Record
// ==========================

function deleteRecord(id) {

    if (!confirm("Delete this medical record?")) {

        return;

    }

    fetch(RECORD_API + "/" + id, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Delete failed.");

        }

        return response.text();

    })

    .then(message => {

        alert(message);

        loadRecords();

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}

// ==========================
// Search Records
// ==========================

function searchRecords() {

    const value = document
        .getElementById("searchRecord")
        .value
        .toLowerCase();

    const filtered = records.filter(record => {

        return (

            String(record.id)
                .includes(value)

            ||

            (record.diagnosis || "")
                .toLowerCase()
                .includes(value)

            ||

            (record.testResults || "")
                .toLowerCase()
                .includes(value)

            ||

            (record.doctorNotes || "")
                .toLowerCase()
                .includes(value)

            ||

            (record.patient?.name || "")
                .toLowerCase()
                .includes(value)

            ||

            (record.doctor?.name || "")
                .toLowerCase()
                .includes(value)

        );

    });

    displayRecords(filtered);

}

// ==========================
// Clear Form
// ==========================

function clearRecordForm() {

    document.getElementById("diagnosis").value = "";

    document.getElementById("doctorNotes").value = "";

    document.getElementById("testResults").value = "";

    document.getElementById("recordDate").value = "";

    document.getElementById("patientId").value = "";

    document.getElementById("doctorId").value = "";

}