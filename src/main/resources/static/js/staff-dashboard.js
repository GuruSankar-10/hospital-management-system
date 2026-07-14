/*=========================================================
            HMS PRO STAFF DASHBOARD
=========================================================*/

const PATIENT_API = `${API_URL}/patients`;
const APPOINTMENT_API = `${API_URL}/appointments`;
const RECORD_API = `${API_URL}/records`;

/*=========================================================
                PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});

/*=========================================================
                INITIALIZE
=========================================================*/

async function initializeDashboard() {

    loadStaffInfo();

    await Promise.all([
        loadPatientCount(),
        loadAppointmentCount(),
        loadRecordCount()
    ]);

    updateClock();

    setInterval(updateClock, 1000);

}

/*=========================================================
                STAFF INFO
=========================================================*/

function loadStaffInfo() {

    const name = localStorage.getItem("name") || "Staff";

    const staffName = document.getElementById("staffName");

    if (staffName) {

        staffName.textContent = name;

    }

}

/*=========================================================
                PATIENT COUNT
=========================================================*/

async function loadPatientCount() {

    try {

        const response = await fetch(PATIENT_API);

        if (!response.ok) throw new Error("Failed to load patients");

        const patients = await response.json();

        const totalPatients = document.getElementById("totalPatients");

        if (totalPatients) {

            totalPatients.innerHTML = patients.length;

        }

    }

    catch (e) {

        console.error("Patients:", e);

    }

}

/*=========================================================
                APPOINTMENT COUNT
=========================================================*/

async function loadAppointmentCount() {

    try {

        const response = await fetch(APPOINTMENT_API);

        if (!response.ok) throw new Error("Failed to load appointments");

        const appointments = await response.json();

        const totalAppointments = document.getElementById("totalAppointments");

        if (totalAppointments) {

            totalAppointments.innerHTML = appointments.length;

        }

    }

    catch (e) {

        console.error("Appointments:", e);

    }

}

/*=========================================================
                RECORD COUNT
=========================================================*/

async function loadRecordCount() {

    try {

        const response = await fetch(RECORD_API);

        if (!response.ok) throw new Error("Failed to load records");

        const records = await response.json();

        const totalRecords = document.getElementById("totalRecords");

        if (totalRecords) {

            totalRecords.innerHTML = records.length;

        }

    }

    catch (e) {

        console.error("Records:", e);

    }

}

/*=========================================================
                LIVE CLOCK
=========================================================*/

function updateClock() {

    const liveClock = document.getElementById("liveClock");

    if (!liveClock) return;

    const now = new Date();

    liveClock.innerHTML = now.toLocaleString();

}

/*=========================================================
                REFRESH
=========================================================*/

function refreshDashboard() {

    initializeDashboard();

}

/*=========================================================
                QUICK NAVIGATION
=========================================================*/

function openPatients() {

    window.location.href = "staff-patients.html";

}

function openAppointments() {

    window.location.href = "staff-appointments.html";

}

function openRecords() {

    window.location.href = "staff-records.html";

}

/*=========================================================
                LOGOUT
=========================================================*/

function logout() {

    localStorage.clear();

    window.location.href = "login.html";

}

/*=========================================================
                WINDOW EVENTS
=========================================================*/

window.addEventListener("focus", () => {

    initializeDashboard();

});

document.addEventListener("visibilitychange", () => {

    if (!document.hidden) {

        initializeDashboard();

    }

});

/*=========================================================
                READY
=========================================================*/

console.log("🏥 Staff Dashboard Loaded Successfully");