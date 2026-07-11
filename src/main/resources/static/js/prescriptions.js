// =====================================
// Prescription Management
// =====================================

let allPrescriptions = [];

// ===============================
// Add Prescription
// ===============================
function addPrescription() {

    const doctorId = document.getElementById("doctorId").value.trim();
    const patientId = document.getElementById("patientId").value.trim();
    const disease = document.getElementById("disease").value.trim();
    const medicines = document.getElementById("medicines").value.trim();
    const advice = document.getElementById("advice").value.trim();

    if (
        doctorId === "" ||
        patientId === "" ||
        disease === "" ||
        medicines === "" ||
        advice === ""
    ) {

        alert("Please fill all fields.");
        return;

    }

    const prescription = {

        disease: disease,

        medicines: medicines,

        advice: advice,

        doctor: {
            id: Number(doctorId)
        },

        patient: {
            id: Number(patientId)
        }

    };

    fetch("/prescriptions", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(prescription)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to save prescription.");

        }

        return response.json();

    })

    .then(data => {

        alert("✅ Prescription Saved Successfully");

        clearPrescriptionForm();

        loadPrescriptions();

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to save prescription.");

    });

}

// ===============================
// Load Prescriptions
// ===============================
function loadPrescriptions() {

    fetch("/prescriptions")

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load prescriptions.");

        }

        return response.json();

    })

    .then(data => {

        allPrescriptions = data;

        renderPrescriptions(allPrescriptions);

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to load prescriptions.");

    });

}
// ===============================
// Render Prescriptions Table
// ===============================
function renderPrescriptions(prescriptions) {

    const table = document.getElementById("prescriptionTable");

    table.innerHTML = "";

    if (prescriptions.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    No Prescriptions Found
                </td>
            </tr>
        `;

        return;

    }

    prescriptions.forEach(prescription => {

        table.innerHTML += `

        <tr>

            <td>${prescription.id}</td>

            <td>${prescription.doctor ? prescription.doctor.id : "-"}</td>

            <td>${prescription.patient ? prescription.patient.id : "-"}</td>

            <td>${prescription.disease}</td>

            <td>${prescription.medicines}</td>

            <td>${prescription.advice}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deletePrescription(${prescription.id})">

                    🗑 Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// Delete Prescription
// ===============================
function deletePrescription(id) {

    if (!confirm("Are you sure you want to delete this prescription?")) {

        return;

    }

    fetch("/prescriptions/" + id, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Delete failed.");

        }

        return response.text();

    })

    .then(message => {

        alert("✅ " + message);

        loadPrescriptions();

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to delete prescription.");

    });

}
// ===============================
// Search Prescriptions
// ===============================
function searchPrescriptions() {

    const keyword = document
        .getElementById("searchBox")
        .value
        .toLowerCase()
        .trim();

    const filteredPrescriptions = allPrescriptions.filter(prescription => {

        return (

            prescription.id.toString().includes(keyword) ||

            prescription.disease.toLowerCase().includes(keyword) ||

            prescription.medicines.toLowerCase().includes(keyword) ||

            prescription.advice.toLowerCase().includes(keyword) ||

            (prescription.doctor &&
                prescription.doctor.id.toString().includes(keyword)) ||

            (prescription.patient &&
                prescription.patient.id.toString().includes(keyword))

        );

    });

    renderPrescriptions(filteredPrescriptions);

}

// ===============================
// Clear Prescription Form
// ===============================
function clearPrescriptionForm() {

    document.getElementById("doctorId").value = "";
    document.getElementById("patientId").value = "";
    document.getElementById("disease").value = "";
    document.getElementById("medicines").value = "";
    document.getElementById("advice").value = "";

}

// ===============================
// Refresh Prescriptions
// ===============================
function refreshPrescriptions() {

    loadPrescriptions();

}

// ===============================
// Get Prescription Count
// ===============================
function getPrescriptionCount() {

    return allPrescriptions.length;

}

// ===============================
// Auto Refresh Every 30 Seconds
// ===============================
setInterval(function () {

    refreshPrescriptions();

}, 30000);

// ===============================
// Page Loaded
// ===============================
window.addEventListener("DOMContentLoaded", function () {

    console.log("Prescription Page Loaded Successfully");

    loadPrescriptions();

});

// ===============================
// Refresh When Window Gets Focus
// ===============================
window.addEventListener("focus", function () {

    refreshPrescriptions();

});