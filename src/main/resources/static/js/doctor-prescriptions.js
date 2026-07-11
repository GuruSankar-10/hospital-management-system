const API = "http://localhost:8080/prescriptions";

const doctorId = localStorage.getItem("doctorId");

const doctorName = localStorage.getItem("name") || "Doctor";

document.getElementById("doctorName").innerHTML =
    "Dr. " + doctorName.replace(/^Dr\.?\s*/i, "");

document.getElementById("todayDate").innerHTML =
    new Date().toDateString();

// ======================
// Load Prescriptions
// ======================

function loadPrescriptions() {

    fetch(API + "/doctor/" + doctorId)

    .then(res => res.json())

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

    });

}

// ======================
// Save Prescription
// ======================

function savePrescription() {

    const patientId =
        document.getElementById("patientId").value;

    const prescription = {

        medicine:
            document.getElementById("medicine").value,

        notes:
            document.getElementById("notes").value,

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

    .then(res => res.json())

    .then(() => {

        alert("Prescription Saved");

        loadPrescriptions();

    });

}

loadPrescriptions();