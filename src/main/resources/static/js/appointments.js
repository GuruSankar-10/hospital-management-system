let allAppointments = [];

// Add Appointment
function addAppointment() {

    let appointment = {
        appointmentDate: document.getElementById("appointmentDate").value,
        appointmentTime: document.getElementById("appointmentTime").value + ":00",
        status: document.getElementById("status").value,
        doctor: {
            id: parseInt(document.getElementById("doctorId").value)
        },
        patient: {
            id: parseInt(document.getElementById("patientId").value)
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
            throw new Error("Failed to add appointment");
        }
        return response.json();
    })
    .then(data => {

        alert("Appointment Added Successfully ✅");

        document.getElementById("appointmentDate").value = "";
        document.getElementById("appointmentTime").value = "";
        document.getElementById("status").value = "";
        document.getElementById("doctorId").value = "";
        document.getElementById("patientId").value = "";

        loadAppointments();

    })
    .catch(error => {
        console.error(error);
        alert("Unable to add appointment");
    });

}

// Load Appointments
function loadAppointments() {

    fetch("/appointments")
    .then(response => response.json())
    .then(data => {
        allAppointments = data;
        renderAppointments(data);
    })
    .catch(error => console.error(error));

}

// Render Table
function renderAppointments(list) {

    let table = document.getElementById("appointmentTable");
    table.innerHTML = "";

    list.forEach(a => {

        table.innerHTML += `
        <tr>
            <td>${a.id}</td>
            <td>${a.appointmentDate}</td>
            <td>${a.appointmentTime}</td>
            <td>${a.status}</td>
            <td>${a.doctor ? a.doctor.id : ""}</td>
            <td>${a.patient ? a.patient.id : ""}</td>
            <td>
                <button class="delete-btn"
                        onclick="deleteAppointment(${a.id})">
                    🗑 Delete
                </button>
            </td>
        </tr>
        `;

    });

}

// Delete Appointment
function deleteAppointment(id) {

    if (!confirm("Delete this appointment?")) return;

    fetch(`/appointments/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(msg => {
        alert(msg);
        loadAppointments();
    })
    .catch(error => console.error(error));

}

window.onload = loadAppointments;