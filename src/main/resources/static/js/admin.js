const BASE_URL =
window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://hospital-management-system-6pok.onrender.com";

// ===============================
// Dashboard Load
// ===============================

window.onload = () => {

    loadDashboard();

    loadAppointments();

    loadPatients();

    loadDate();

    loadAdminName();

};

// ===============================
// Dashboard Counts
// ===============================

async function loadDashboard(){

    try{

        const [
            doctors,
            staff,
            patients,
            appointments
        ] = await Promise.all([

            fetch(BASE_URL + "/doctors").then(res=>res.json()),

            fetch(BASE_URL + "/staff").then(res=>res.json()),

            fetch(BASE_URL + "/patients").then(res=>res.json()),

            fetch(BASE_URL + "/appointments").then(res=>res.json())

        ]);

        // Cards

        document.getElementById("doctorCount").innerText = doctors.length;

        document.getElementById("staffCount").innerText = staff.length;

        document.getElementById("patientCount").innerText = patients.length;

        document.getElementById("appointmentCount").innerText = appointments.length;

    }

    catch(error){

        console.error(error);

    }

}

// ===============================
// Recent Appointments
// ===============================

async function loadAppointments(){

    try{

        const response = await fetch(BASE_URL + "/appointments");

        const appointments = await response.json();

        let rows = "";

        appointments
        .slice(-5)
        .reverse()
        .forEach(a=>{

            rows += `

            <tr>

                <td>${a.id}</td>

                <td>${a.patient ? a.patient.name : "-"}</td>

                <td>${a.doctor ? a.doctor.name : "-"}</td>

                <td>${a.appointmentDate}</td>

                <td>${a.status}</td>

            </tr>

            `;

        });

        document.getElementById("appointmentTable").innerHTML = rows;

    }

    catch(error){

        console.log(error);

    }

}

// ===============================
// Recent Patients
// ===============================

async function loadPatients(){

    try{

        const response = await fetch(BASE_URL + "/patients");

        const patients = await response.json();

        let rows = "";

        patients
        .slice(-5)
        .reverse()
        .forEach(p=>{

            rows += `

            <tr>

                <td>${p.id}</td>

                <td>${p.name}</td>

                <td>${p.age}</td>

                <td>${p.disease}</td>

            </tr>

            `;

        });

        document.getElementById("patientTable").innerHTML = rows;

    }

    catch(error){

        console.log(error);

    }

}

// ===============================
// Admin Name
// ===============================

function loadAdminName(){

    const admin = localStorage.getItem("name");

    if(admin){

        document.getElementById("adminName").innerHTML = admin;

    }

}

// ===============================
// Current Date
// ===============================

function loadDate(){

    const today = new Date();

    document.getElementById("todayDate").innerHTML =
        today.toDateString();

}

// ===============================
// Refresh Dashboard Every 30 sec
// ===============================

setInterval(()=>{

    loadDashboard();

    loadAppointments();

    loadPatients();

},30000);