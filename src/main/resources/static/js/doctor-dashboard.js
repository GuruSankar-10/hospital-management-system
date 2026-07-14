/*=========================================================
                HMS PRO DOCTOR DASHBOARD
=========================================================*/

const doctorId = localStorage.getItem("doctorId");

const doctorName =
localStorage.getItem("name") || "Doctor";

const doctorNameElement =
document.getElementById("doctorName");

if(doctorNameElement){

    doctorNameElement.innerHTML = doctorName;

}

document.getElementById("doctorBannerName").innerHTML =
doctorName;


/*=========================================================
                    API URLS
=========================================================*/

const PATIENT_API =
API_URL + "/patients/doctor/" + doctorId;

const APPOINTMENT_API =
API_URL + "/appointments/doctor/" + doctorId;

const PRESCRIPTION_API =
API_URL + "/prescriptions/doctor/" + doctorId;


/*=========================================================
                PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

loadDashboard();

});


/*=========================================================
                LOAD DASHBOARD
=========================================================*/

async function loadDashboard(){

await Promise.all([

loadPatients(),

loadAppointments(),

loadPrescriptions()

]);

}
/*=========================================================
                LOAD PATIENTS
=========================================================*/

async function loadPatients(){

try{

const response =
await fetch(PATIENT_API);

const patients =
await response.json();

document.getElementById("patientCount").innerHTML =
patients.length;

document.getElementById("criticalCount").innerHTML =
patients.filter(p=>

(p.disease||"").toLowerCase().includes("critical")

).length;

loadPatientTable(patients);

}

catch(error){

console.error(error);

}

}


/*=========================================================
                PATIENT TABLE
=========================================================*/

function loadPatientTable(patients){

const table =
document.getElementById("recentPatientTable");

table.innerHTML="";

patients.slice(0,5).forEach(patient=>{

table.innerHTML+=`

<tr>

<td>${patient.id}</td>

<td>${patient.name}</td>

<td>${patient.age}</td>

<td>${patient.disease}</td>

<td>${patient.phone}</td>

<td>

<button class="btn">

<i class="fas fa-eye"></i>

</button>

</td>

</tr>

`;

});

}
/*=========================================================
                LOAD APPOINTMENTS
=========================================================*/

async function loadAppointments() {

    try {

        const response = await fetch(APPOINTMENT_API);

        const appointments = await response.json();

        document.getElementById("appointmentCount").innerHTML =
            appointments.length;

        document.getElementById("pendingCount").innerHTML =
            appointments.filter(a =>
                (a.status || "").toUpperCase() === "PENDING"
            ).length;

        document.getElementById("completedCount").innerHTML =
            appointments.filter(a =>
                (a.status || "").toUpperCase() === "COMPLETED"
            ).length;

        loadAppointmentTable(appointments);

    }

    catch (error) {

        console.error("Appointments Error :", error);

    }

}


/*=========================================================
            TODAY APPOINTMENTS TABLE
=========================================================*/

function loadAppointmentTable(appointments) {

    const table =
        document.getElementById("todayAppointmentTable");

    table.innerHTML = "";

    appointments.slice(0, 5).forEach(app => {

        table.innerHTML += `

<tr>

<td>${app.id}</td>

<td>${app.patient?.name || "-"}</td>

<td>${app.time || "-"}</td>

<td>

<span class="status ${getStatusClass(app.status)}">

${app.status}

</span>

</td>

<td>

<button class="btn"

onclick="location.href='doctor-appointments.html'">

<i class="fas fa-eye"></i>

</button>

</td>

</tr>

`;

    });

}


/*=========================================================
                STATUS COLOR
=========================================================*/

function getStatusClass(status) {

    if (!status) return "pending";

    switch (status.toUpperCase()) {

        case "COMPLETED":
            return "completed";

        case "CONFIRMED":
            return "confirmed";

        case "CANCELLED":
            return "cancelled";

        default:
            return "pending";

    }

}
/*=========================================================
                LOAD PRESCRIPTIONS
=========================================================*/

async function loadPrescriptions() {

    try {

        const response = await fetch(PRESCRIPTION_API);

        const prescriptions = await response.json();

        document.getElementById("prescriptionCount").innerHTML =
            prescriptions.length;

        document.getElementById("recordCount").innerHTML =
            prescriptions.length;

        loadPrescriptionTable(prescriptions);

    }

    catch (error) {

        console.error("Prescription Error :", error);

    }

}


/*=========================================================
            PRESCRIPTION TABLE
=========================================================*/

function loadPrescriptionTable(prescriptions) {

    const table =
        document.getElementById("recentPrescriptionTable");

    table.innerHTML = "";

    prescriptions.slice(0, 5).forEach(p => {

        table.innerHTML += `

<tr>

<td>${p.id}</td>

<td>${p.patient?.name || "-"}</td>

<td>${p.medicine || "-"}</td>

<td>${p.date || "-"}</td>

<td>

<button class="btn">

<i class="fas fa-eye"></i>

</button>

</td>

</tr>

`;

    });

}
/*=========================================================
                LIVE SEARCH
=========================================================*/

const search =
document.getElementById("dashboardSearch");

if (search) {

    search.addEventListener("keyup", function () {

        const value =
        this.value.toLowerCase();

        document
            .querySelectorAll("tbody tr")
            .forEach(row => {

                row.style.display =
                    row.innerText
                        .toLowerCase()
                        .includes(value)
                        ? ""
                        : "none";

            });

    });

}


/*=========================================================
                AUTO REFRESH
=========================================================*/

setInterval(() => {

    loadDashboard();

}, 30000);


/*=========================================================
                WINDOW FOCUS
=========================================================*/

window.addEventListener("focus", () => {

    loadDashboard();

});


/*=========================================================
                PAGE VISIBILITY
=========================================================*/

document.addEventListener("visibilitychange", () => {

    if (!document.hidden) {

        loadDashboard();

    }

});


/*=========================================================
                END
=========================================================*/

console.log("HMS PRO Doctor Dashboard Loaded Successfully");