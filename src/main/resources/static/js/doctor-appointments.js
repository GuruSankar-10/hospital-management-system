const BASE_URL =
window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://hospital-management-system-6pok.onrender.com";

const doctorId = localStorage.getItem("doctorId");

const API =
BASE_URL + "/appointments/doctor/" + doctorId;

const STATUS_API =
BASE_URL + "/appointments";


let appointments = [];

let selectedAppointmentId = null;

// ===============================
// Page Load
// ===============================

window.onload = function () {

    loadAppointments();

    document
        .getElementById("searchAppointment")
        .addEventListener("keyup", searchAppointment);

};

// ===============================
// Load Appointments
// ===============================

async function loadAppointments() {

    try {

        const response = await fetch(API);

        appointments = await response.json();

        displayAppointments(appointments);

        updateCards(appointments);

    }

    catch (error) {

        console.error(error);

    }

}

// ===============================
// Display Appointments
// ===============================

function displayAppointments(list) {

    let rows = "";

    list.forEach(a => {

        rows += `

        <tr>

            <td>${a.id}</td>

            <td>${a.patient ? a.patient.name : "-"}</td>

            <td>${a.appointmentDate}</td>

            <td>${a.appointmentTime}</td>

            <td>

                <span class="status ${a.status.toLowerCase()}">

                    ${a.status}

                </span>

            </td>

            <td>

                <button
                    class="editBtn"
                    onclick="openStatusModal(${a.id},'${a.status}')">

                    <i class="fas fa-edit"></i>

                    Update

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("appointmentTable").innerHTML = rows;

}

// ===============================
// Dashboard Cards
// ===============================

function updateCards(list) {

    document.getElementById("appointmentCount").innerHTML =
        list.length;

    let pending = 0;

    let confirmed = 0;

    let completed = 0;

    list.forEach(a => {

        const status = (a.status || "").toUpperCase();

        if (status === "PENDING")

            pending++;

        else if (status === "CONFIRMED")

            confirmed++;

        else if (status === "COMPLETED")

            completed++;

    });

    document.getElementById("pendingCount").innerHTML =
        pending;

    document.getElementById("confirmedCount").innerHTML =
        confirmed;

    document.getElementById("completedCount").innerHTML =
        completed;

}

// ===============================
// Search
// ===============================

function searchAppointment() {

    const keyword = document
        .getElementById("searchAppointment")
        .value
        .toLowerCase();

    const filtered = appointments.filter(a =>

        (a.patient?.name || "")
            .toLowerCase()
            .includes(keyword)

        ||

        (a.status || "")
            .toLowerCase()
            .includes(keyword)

        ||

        (a.appointmentDate || "")
            .includes(keyword)

    );

    displayAppointments(filtered);

}

// ===============================
// Open Status Modal
// ===============================

function openStatusModal(id, status) {

    selectedAppointmentId = id;

    document.getElementById("appointmentId").value = id;

    document.getElementById("appointmentStatus").value =
        status;

    document.getElementById("statusModal").style.display =
        "block";

}

// ===============================
// Close Modal
// ===============================

function closeStatusModal() {

    document.getElementById("statusModal").style.display =
        "none";

}

// ===============================
// Update Status
// ===============================

async function updateStatus() {

    const status =
        document.getElementById("appointmentStatus").value;

    const body = {

        status: status

    };

    try {

        await fetch(

            STATUS_API +
            "/" +
            selectedAppointmentId +
            "/status",

            {

                method: "PUT",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify(body)

            }

        );

        closeStatusModal();

        loadAppointments();

    }

    catch (error) {

        console.error(error);

    }

}