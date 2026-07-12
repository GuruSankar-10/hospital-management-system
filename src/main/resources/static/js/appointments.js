const API = "http://localhost:8080/appointments";
const PATIENT_API = "http://localhost:8080/patients";
const DOCTOR_API = "http://localhost:8080/doctors";

let deleteAppointmentId = null;

// ===============================
// Page Load
// ===============================

window.onload = function () {

    loadAppointments();
    loadPatients();
    loadDoctors();

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

        const appointments = await response.json();

        displayAppointments(appointments);

        updateCards(appointments);

    } catch (e) {

        console.error(e);

    }

}

// ===============================
// Display Appointments
// ===============================

function displayAppointments(appointments) {

    let rows = "";

    appointments.forEach(a => {

        rows += `

        <tr>

            <td>${a.id}</td>

            <td>${a.patient ? a.patient.name : "-"}</td>

            <td>${a.doctor ? a.doctor.name : "-"}</td>

            <td>${a.appointmentDate}</td>

            <td>${a.appointmentTime}</td>

            <td>${a.status}</td>

            <td>

                <button class="editBtn"
                    onclick="editAppointment(${a.id})">

                    <i class="fa fa-edit"></i>

                </button>

                <button class="deleteBtn"
                    onclick="deleteAppointment(${a.id})">

                    <i class="fa fa-trash"></i>

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

function updateCards(appointments) {

    document.getElementById("appointmentCount").innerHTML =
        appointments.length;

    let confirmed = 0;
    let pending = 0;
    let cancelled = 0;

    appointments.forEach(a => {

        const status = (a.status || "").toUpperCase();

        if (status === "CONFIRMED")
            confirmed++;

        else if (status === "PENDING")
            pending++;

        else if (status === "CANCELLED")
            cancelled++;

    });

    document.getElementById("confirmedCount").innerHTML = confirmed;
    document.getElementById("pendingCount").innerHTML = pending;
    document.getElementById("cancelledCount").innerHTML = cancelled;

}

// ===============================
// Load Patients
// ===============================

async function loadPatients() {

    const response = await fetch(PATIENT_API);

    const patients = await response.json();

    const select = document.getElementById("patientSelect");

    select.innerHTML =
        '<option value="">Select Patient</option>';

    patients.forEach(p => {

        select.innerHTML +=
            `<option value="${p.id}">${p.name}</option>`;

    });

}

// ===============================
// Load Doctors
// ===============================

async function loadDoctors() {

    const response = await fetch(DOCTOR_API);

    const doctors = await response.json();

    const select = document.getElementById("doctorSelect");

    select.innerHTML =
        '<option value="">Select Doctor</option>';

    doctors.forEach(d => {

        select.innerHTML +=
            `<option value="${d.id}">${d.name}</option>`;

    });

}

// ===============================
// Search
// ===============================

async function searchAppointment() {

    const keyword =
        document.getElementById("searchAppointment")
        .value
        .toLowerCase();

    const response = await fetch(API);

    const appointments = await response.json();

    const filtered = appointments.filter(a =>

        (a.patient?.name || "")
            .toLowerCase()
            .includes(keyword)

        ||

        (a.doctor?.name || "")
            .toLowerCase()
            .includes(keyword)

        ||

        (a.status || "")
            .toLowerCase()
            .includes(keyword)

    );

    displayAppointments(filtered);

}

// ===============================
// Open Modal
// ===============================

function openAppointmentModal() {

    document.getElementById("modalTitle").innerHTML =
        "New Appointment";

    document.getElementById("appointmentId").value = "";

    document.getElementById("patientSelect").value = "";

    document.getElementById("doctorSelect").value = "";

    document.getElementById("appointmentDate").value = "";

    document.getElementById("appointmentTime").value = "";

    document.getElementById("appointmentStatus").value = "";

    document.getElementById("appointmentModal").style.display = "block";

}

function closeAppointmentModal() {

    document.getElementById("appointmentModal").style.display = "none";

}

// ===============================
// Save Appointment
// ===============================

async function saveAppointment() {

    const id = document.getElementById("appointmentId").value;

    const appointment = {

        appointmentDate:
            document.getElementById("appointmentDate").value,

        appointmentTime:
            document.getElementById("appointmentTime").value,

        status:
            document.getElementById("appointmentStatus").value,

        doctor: {

            id: document.getElementById("doctorSelect").value

        },

        patient: {

            id: document.getElementById("patientSelect").value

        }

    };

    if (

        !appointment.appointmentDate ||

        !appointment.appointmentTime ||

        !appointment.status ||

        !appointment.doctor.id ||

        !appointment.patient.id

    ) {

        alert("Please fill all fields");

        return;

    }

    const url = id ? API + "/" + id : API;

    const method = id ? "PUT" : "POST";

    await fetch(url, {

        method: method,

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(appointment)

    });

    closeAppointmentModal();

    loadAppointments();

}

// ===============================
// Edit
// ===============================

async function editAppointment(id) {

    const response = await fetch(API + "/" + id);

    const a = await response.json();

    document.getElementById("modalTitle").innerHTML =
        "Edit Appointment";

    document.getElementById("appointmentId").value = a.id;

    document.getElementById("patientSelect").value =
        a.patient ? a.patient.id : "";

    document.getElementById("doctorSelect").value =
        a.doctor ? a.doctor.id : "";

    document.getElementById("appointmentDate").value =
        a.appointmentDate;

    document.getElementById("appointmentTime").value =
        a.appointmentTime;

    document.getElementById("appointmentStatus").value =
        a.status;

    document.getElementById("appointmentModal").style.display =
        "block";

}

// ===============================
// Delete
// ===============================

function deleteAppointment(id) {

    deleteAppointmentId = id;

    document.getElementById("deleteModal").style.display =
        "block";

}

function closeDeleteModal() {

    document.getElementById("deleteModal").style.display =
        "none";

}

async function confirmDelete() {

    await fetch(API + "/" + deleteAppointmentId, {

        method: "DELETE"

    });

    closeDeleteModal();

    loadAppointments();

}