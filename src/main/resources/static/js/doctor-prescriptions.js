// ==========================================
// Doctor Prescriptions
// ==========================================

// API URL
const BASE_URL =
window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://hospital-management-system-6pok.onrender.com";

const API = BASE_URL + "/prescriptions";

// Doctor Details
const doctorId = localStorage.getItem("doctorId");

if (!doctorId) {
    alert("Session expired. Please login again.");
    window.location.href = "login.html";
}

const doctorName = localStorage.getItem("name") || "Doctor";

document.getElementById("doctorName").innerHTML =
    "Dr. " + doctorName.replace(/^Dr\.?\s*/i, "");

document.getElementById("todayDate").innerHTML =
    new Date().toDateString();

// ======================================
// Load Prescriptions
// ======================================

function loadPrescriptions() {

    fetch(API + "/doctor/" + doctorId)

    .then(res => {

        if (!res.ok) {
            throw new Error("Unable to load prescriptions");
        }

        return res.json();

    })

    .then(data => {

        let table = document.getElementById("prescriptionTable");

        table.innerHTML = "";

        data.forEach(p => {

            table.innerHTML += `

            <tr>

                <td>${p.id}</td>

                <td>${p.patient ? p.patient.name : "-"}</td>

                <td>${p.medicine}</td>

                <td>${p.notes}</td>

            </tr>

            `;

        });

    })

    .catch(err => {

        console.error(err);

        alert(err.message);

    });

}

// ======================================
// Save Prescription
// ======================================

function savePrescription() {

    const patientId =
        document.getElementById("patientId").value;

    const medicine =
        document.getElementById("medicine").value.trim();

    const notes =
        document.getElementById("notes").value.trim();

    if (!patientId || !medicine || !notes) {

        alert("Please fill all fields.");

        return;

    }

    const prescription = {

        medicine: medicine,

        notes: notes,

        doctor: {

            id: doctorId

        },

        patient: {

            id: patientId

        }

    };

    fetch(API, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(prescription)

    })

    .then(res => {

        if (!res.ok) {

            throw new Error("Failed to save prescription");

        }

        return res.json();

    })

    .then(() => {

        alert("Prescription Saved Successfully");

        document.getElementById("patientId").value = "";
        document.getElementById("medicine").value = "";
        document.getElementById("notes").value = "";

        loadPrescriptions();

    })

    .catch(err => {

        console.error(err);

        alert(err.message);

    });

}

// ======================================
// Initial Load
// ======================================

loadPrescriptions();