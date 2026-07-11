// =====================================
// Appointment Management
// =====================================

let allAppointments = [];

// ===============================
// Add Appointment
// ===============================
function addAppointment() {

    const doctorId = document.getElementById("doctorId").value.trim();
    const patientId = document.getElementById("patientId").value.trim();
    const appointmentDate = document.getElementById("appointmentDate").value;
    const appointmentTime = document.getElementById("appointmentTime").value;
    const status = document.getElementById("status").value.trim();

    if (
        doctorId === "" ||
        patientId === "" ||
        appointmentDate === "" ||
        appointmentTime === "" ||
        status === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    const appointment = {

        appointmentDate: appointmentDate,

        appointmentTime: appointmentTime + ":00",

        status: status,

        doctor: {
            id: Number(doctorId)
        },

        patient: {
            id: Number(patientId)
        }

    };

    fetch("/appointments", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(appointment)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to add appointment.");

        }

        return response.json();

    })

    .then(data => {

        alert("✅ Appointment Added Successfully");

        clearAppointmentForm();

        loadAppointments();

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to add appointment.");

    });

}
// ===============================
// Load Appointments
// ===============================
function loadAppointments() {

    fetch("/appointments")

    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to fetch appointments.");
        }

        return response.json();

    })

    .then(data => {

        allAppointments = data;

        renderAppointments(allAppointments);

    })

    .catch(error => {

        console.error(error);

        alert("❌ Unable to load appointments.");

    });

}

// ===============================
// Render Appointment Table
// ===============================
function renderAppointments(list) {

    const table = document.getElementById("appointmentTable");

    table.innerHTML = "";

    if (list.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    No Appointments Found
                </td>
            </tr>
        `;

        return;

    }

    list.forEach(appointment => {

        table.innerHTML += `

        <tr>

            <td>${appointment.id}</td>

            <td>${appointment.appointmentDate}</td>

            <td>${appointment.appointmentTime}</td>

            <td>${appointment.status}</td>

            <td>${appointment.doctor ? appointment.doctor.id : "-"}</td>

            <td>${appointment.patient ? appointment.patient.id : "-"}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteAppointment(${appointment.id})">

                    🗑 Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// Delete Appointment
// ===============================
function deleteAppointment(id) {

    if (!confirm("Are you sure you want to delete this appointment?")) {

        return;

    }

    fetch("/appointments/" + id, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to delete appointment.");

        }

        return response.text();

    })

    .then(message => {

        alert("✅ " + message);

        loadAppointments();

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to delete appointment.");

    });

}
// ===============================
// Search Appointments
// ===============================
function searchAppointments() {

    const keyword = document
        .getElementById("searchBox")
        .value
        .toLowerCase();

    const filteredAppointments = allAppointments.filter(appointment => {

        return (
            appointment.id.toString().includes(keyword) ||
            appointment.status.toLowerCase().includes(keyword) ||
            appointment.appointmentDate.toLowerCase().includes(keyword) ||
            (appointment.doctor &&
                appointment.doctor.id.toString().includes(keyword)) ||
            (appointment.patient &&
                appointment.patient.id.toString().includes(keyword))
        );

    });

    renderAppointments(filteredAppointments);

}

// ===============================
// Clear Appointment Form
// ===============================
function clearAppointmentForm() {

    document.getElementById("doctorId").value = "";
    document.getElementById("patientId").value = "";
    document.getElementById("appointmentDate").value = "";
    document.getElementById("appointmentTime").value = "";
    document.getElementById("status").value = "";

}

// ===============================
// Refresh Appointment List
// ===============================
function refreshAppointments() {

    loadAppointments();

}

// ===============================
// Page Load
// ===============================
window.addEventListener("DOMContentLoaded", function () {

    console.log("Appointments Page Loaded Successfully");

    loadAppointments();

});