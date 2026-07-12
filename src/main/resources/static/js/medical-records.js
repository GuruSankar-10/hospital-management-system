// ==========================================
// Medical Records
// ==========================================

const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

const API_URL = isLocal
    ? "http://localhost:8080"
    : "https://hospital-management-system-6pok.onrender.com";

// ==========================================
// Load Medical Records
// ==========================================

function loadMedicalRecords() {

    fetch(API_URL + "/medical-records", {

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load medical records.");

        }

        return response.json();

    })

    .then(records => {

        const table = document.getElementById("recordsTable");

        table.innerHTML = "";

        records.forEach(record => {

            table.innerHTML += `

            <tr>

                <td>${record.id}</td>

                <td>${record.patient ? record.patient.name : "-"}</td>

                <td>${record.diagnosis}</td>

                <td>${record.symptoms}</td>

                <td>${record.treatment}</td>

                <td>${record.visitDate}</td>

                <td>

                    <button
                    class="delete-btn"
                    onclick="deleteMedicalRecord(${record.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    })

    .catch(error => {

        alert(error.message);

    });

}

// ==========================================
// Save Medical Record
// ==========================================

function saveMedicalRecord() {

    const doctorId = localStorage.getItem("doctorId");

    const patientId = document.getElementById("patientId").value;

    const diagnosis = document.getElementById("diagnosis").value;

    const symptoms = document.getElementById("symptoms").value;

    const treatment = document.getElementById("treatment").value;

    const notes = document.getElementById("notes").value;

    if (!patientId || diagnosis === "") {

        alert("Patient ID and Diagnosis are required.");

        return;

    }

    const medicalRecord = {

        patient: {

            id: patientId

        },

        doctor: {

            id: doctorId

        },

        diagnosis: diagnosis,

        symptoms: symptoms,

        treatment: treatment,

        notes: notes,

        visitDate: new Date().toISOString().split("T")[0]

    };

    fetch(API_URL + "/medical-records", {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            "Authorization": "Bearer " + localStorage.getItem("token")

        },

        body: JSON.stringify(medicalRecord)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to save medical record.");

        }

        return response.json();

    })

    .then(() => {

        alert("✅ Medical Record Saved Successfully");

        clearForm();

        loadMedicalRecords();

    })

    .catch(error => {

        alert(error.message);

    });

}

// ==========================================
// Delete Medical Record
// ==========================================

function deleteMedicalRecord(id) {

    if (!confirm("Delete this medical record?")) {

        return;

    }

    fetch(API_URL + "/medical-records/" + id, {

        method: "DELETE",

        headers: {

            "Authorization": "Bearer " + localStorage.getItem("token")

        }

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to delete medical record.");

        }

        return response.text();

    })

    .then(message => {

        alert(message);

        loadMedicalRecords();

    })

    .catch(error => {

        alert(error.message);

    });

}

// ==========================================
// Clear Form
// ==========================================

function clearForm() {

    document.getElementById("patientId").value = "";

    document.getElementById("diagnosis").value = "";

    document.getElementById("symptoms").value = "";

    document.getElementById("treatment").value = "";

    document.getElementById("notes").value = "";

}

// ==========================================
// Load Records Automatically
// ==========================================

window.onload = function () {

    loadMedicalRecords();

};