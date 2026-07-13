// ==========================================
// Doctor Dashboard
// ==========================================

const BASE_URL =
window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://hospital-management-system-6pok.onrender.com";

const doctorId = localStorage.getItem("doctorId");

const PATIENT_API =
BASE_URL + "/patients/doctor/" + doctorId;

const APPOINTMENT_API =
BASE_URL + "/appointments/doctor/" + doctorId;

// ===============================
// Page Load
// ===============================

window.onload = function(){

    loadPatients();

    loadAppointments();

};

// ===============================
// Load Patients
// ===============================

async function loadPatients(){

    try{

        const response =
        await fetch(PATIENT_API);

        const patients =
        await response.json();

        document.getElementById("patientCount").innerHTML =
        patients.length;

        showRecentPatients(patients);

    }

    catch(error){

        console.error(error);

    }

}

// ===============================
// Recent Patients
// ===============================

function showRecentPatients(patients){

    let rows = "";

    patients.slice(0,5).forEach(patient=>{

        rows += `

        <tr>

        <td>${patient.name}</td>

        <td>${patient.age}</td>

        <td>${patient.disease}</td>

        </tr>

        `;

    });

    document.getElementById("recentPatients").innerHTML =
    rows;

}

// ===============================
// Load Appointments
// ===============================

async function loadAppointments(){

    try{

        const response =
        await fetch(APPOINTMENT_API);

        const appointments =
        await response.json();

        document.getElementById("appointmentCount").innerHTML =
        appointments.length;

        showAppointments(appointments);

        updateCards(appointments);

    }

    catch(error){

        console.error(error);

    }

}

// ===============================
// Today's Appointments
// ===============================

function showAppointments(appointments){

    let rows = "";

    appointments.forEach(a=>{

        rows += `

        <tr>

        <td>${a.patient ? a.patient.name : "-"}</td>

        <td>${a.appointmentDate}</td>

        <td>${a.appointmentTime}</td>

        <td>${a.status}</td>

        </tr>

        `;

    });

    document.getElementById("todayAppointments").innerHTML =
    rows;

}

// ===============================
// Dashboard Cards
// ===============================

function updateCards(appointments){

    let pending=0;

    let completed=0;

    let confirmed=0;

    appointments.forEach(a=>{

        const status =
        (a.status || "").toUpperCase();

        if(status==="PENDING")

            pending++;

        else if(status==="COMPLETED")

            completed++;

        else if(status==="CONFIRMED")

            confirmed++;

    });

    document.getElementById("pendingCount").innerHTML =
    pending;

    document.getElementById("completedCount").innerHTML =
    completed;

    document.getElementById("pendingAppointments").innerHTML =
    pending;

    document.getElementById("completedAppointments").innerHTML =
    completed;

    document.getElementById("confirmedAppointments").innerHTML =
    confirmed;

}