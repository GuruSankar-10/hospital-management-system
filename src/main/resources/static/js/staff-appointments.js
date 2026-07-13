console.log("Staff Appointment JS Loaded");

// ==========================================
// Base URL
// ==========================================

const BASE_URL =
window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://hospital-management-system-6pok.onrender.com";

const APPOINTMENT_API = BASE_URL + "/appointments";

let appointmentData = [];

// ==============================
// Page Load
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    loadAppointments();

});

// ==============================
// Load Appointments
// ==============================

function loadAppointments() {

    fetch(APPOINTMENT_API)

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load appointments.");

        }

        return response.json();

    })

    .then(data => {

        appointmentData = data;

        displayAppointments(data);

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}

// ==============================
// Display Appointments
// ==============================

function displayAppointments(data) {

    let rows = "";

    data.forEach(app => {

        rows += `

        <tr>

            <td>${app.id}</td>

            <td>${app.patient ? app.patient.name : "N/A"}</td>

            <td>${app.doctor ? app.doctor.name : "N/A"}</td>

            <td>${app.appointmentDate || app.date || "N/A"}</td>

            <td>

                <select onchange="updateStatus(${app.id},this.value)">

                    <option value="PENDING"
                        ${app.status === "PENDING" ? "selected" : ""}>
                        PENDING
                    </option>

                    <option value="CONFIRMED"
                        ${app.status === "CONFIRMED" ? "selected" : ""}>
                        CONFIRMED
                    </option>

                    <option value="COMPLETED"
                        ${app.status === "COMPLETED" ? "selected" : ""}>
                        COMPLETED
                    </option>

                    <option value="CANCELLED"
                        ${app.status === "CANCELLED" ? "selected" : ""}>
                        CANCELLED
                    </option>

                </select>

            </td>

            <td>

                <button
                    class="deleteBtn"
                    onclick="deleteAppointment(${app.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("appointmentTable").innerHTML = rows;

}

// ==============================
// Search Appointment
// ==============================

function searchAppointments() {

    const value =
        document.getElementById("searchAppointment")
        .value
        .toLowerCase();

    const filtered = appointmentData.filter(app => {

        return (

            (app.patient?.name || "")
                .toLowerCase()
                .includes(value)

            ||

            (app.doctor?.name || "")
                .toLowerCase()
                .includes(value)

            ||

            (app.status || "")
                .toLowerCase()
                .includes(value)

        );

    });

    displayAppointments(filtered);

}

// ==============================
// Update Status
// ==============================

function updateStatus(id, status) {

    fetch(APPOINTMENT_API + "/" + id + "/status", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            status: status

        })

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Status Update Failed");

        }

        return response.json();

    })

    .then(() => {

        alert("Appointment Status Updated");

        loadAppointments();

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}

// ==============================
// Delete Appointment
// ==============================

function deleteAppointment(id) {

    if (!confirm("Delete this appointment?")) {

        return;

    }

    fetch(APPOINTMENT_API + "/" + id, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Delete Failed");

        }

        return response.text();

    })

    .then(message => {

        alert(message);

        loadAppointments();

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}